import React, { useState, useEffect } from 'react';
import LogEditor from './components/LogEditor';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PrintPreview from './components/PrintPreview';



function App() {
  const [logEntries, setLogEntries] = useState(() => {
    const stored = localStorage.getItem('logEntries');
    return stored ? JSON.parse(stored) : [];
  });

  // Save to localStorage on update
  useEffect(() => {
    localStorage.setItem('logEntries', JSON.stringify(logEntries));
  }, [logEntries]);

  const handleDelete = (index) => {
    setLogEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdate = (newEntry) => {
    setLogEntries((prev) => [...prev, newEntry]);
  };

  const handleNewDay = () => {
    if (window.confirm('Are you sure you want to clear all entries and start a new day?')) {
      setLogEntries([]);
    }
  };

  const moveEntry = (fromIndex, toIndex) => {
    setLogEntries(prev => {
      const newEntries = [...prev];
      const [movedItem] = newEntries.splice(fromIndex, 1);
      newEntries.splice(toIndex, 0, movedItem);
      return newEntries;
    });
  };
  const handleExport = () => {
    const previewNode = document.getElementById('print-preview');
  
    // Temporarily show it for export
    previewNode.style.display = 'block';
  
    // Allow browser time to apply styles
    setTimeout(() => {
      html2canvas(previewNode, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`helpdesk-log-${new Date().toISOString().slice(0, 10)}.pdf`);
  
        // Hide again after export
        previewNode.style.display = 'none';
      });
    }, 100); // Delay to ensure styles apply
  };    

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
        <div className="flex flex-col md:flex-row h-screen">
          
          {/* Left Panel - Editor */}
            <div className="md:w-1/2 p-8 bg-slate-800 border-r border-slate-700 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt="DeskOps Journal Logo" 
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-2xl font-semibold text-white">🛠️ DeskOps Journal</h1>
            </div>

              <LogEditor onUpdate={handleUpdate} />
            </div>


          {/* Right Panel - Output */}
          <div className="md:w-1/2 p-8 bg-slate-900 overflow-auto">
            <h2 className="text-xl font-medium mb-4 text-slate-300">📝 Markdown Preview</h2>
            
            <div className="bg-white text-black rounded-lg p-6 border border-slate-300 shadow-md space-y-4">
              <div className="flex gap-4 mb-4">
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Export PDF
                </button>
                <button
                  onClick={handleNewDay}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Start New Day
                </button>
              </div>

              {logEntries.length === 0 ? (
                <p className="text-sm text-gray-500">No entries yet. Use the form to add a log.</p>
              ) : (
                <div className="space-y-4 text-sm">
                  {logEntries.map((entry, index) => (
  <div key={index} className="border-b border-gray-300 pb-4 relative">
    <div className="absolute right-0 top-0 flex gap-1 print:hidden">
      {index > 0 && (
        <button
          className="text-xs bg-slate-300 text-black px-2 rounded hover:bg-slate-400"
          onClick={() => moveEntry(index, index - 1)}
          title="Move Up"
        >
          ↑
        </button>
      )}
      {index < logEntries.length - 1 && (
        <button
          className="text-xs bg-slate-300 text-black px-2 rounded hover:bg-slate-400"
          onClick={() => moveEntry(index, index + 1)}
          title="Move Down"
        >
          ↓
        </button>
      )}
      <button
        className="text-xs bg-red-300 text-black px-2 rounded hover:bg-red-400"
        onClick={() => handleDelete(index)}
        title="Delete Entry"
      >
        ×
      </button>
    </div>

    <p><strong>📅 Date:</strong> {entry.date || '—'} &nbsp;&nbsp; <strong>⏰ Time:</strong> {entry.startTime || '—'}{entry.endTime && ` – ${entry.endTime}`}</p>
    <p><strong>🧩 Task:</strong> {entry.task || '—'}</p>
    <p><strong>✅ Result:</strong> {entry.result || '—'}</p>
    <p><strong>📝 Notes:</strong></p>
    <div className="bg-slate-100 p-2 rounded text-sm text-gray-800 whitespace-pre-wrap">
    {entry.notes?.trim() ? entry.notes : '—'}
    </div>
  </div>
))}

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="print-preview" style={{ display: 'none' }}>
  <PrintPreview logEntries={logEntries} />
</div>
</>
);
}

export default App;

