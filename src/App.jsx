import React, { useState, useEffect } from 'react';
import LogEditor from './components/LogEditor';
import html2pdf from 'html2pdf.js';

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

  const handleExport = () => {
    const container = document.createElement('div');
    container.style.padding = '1rem';
    container.style.fontFamily = 'sans-serif';
    container.style.fontSize = '12px';

    logEntries.forEach((entry) => {
      const block = document.createElement('div');
      block.style.marginBottom = '1rem';
      block.innerHTML = entry
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
      container.appendChild(block);
    });

    html2pdf().from(container).set({
      margin: 0.5,
      filename: `helpdesk-log-${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save();
  };

  const handleNewDay = () => {
    setLogEntries([]);
    localStorage.removeItem('logEntries');
  };

  const moveEntry = (fromIndex, toIndex) => {
    setLogEntries(prev => {
      const newEntries = [...prev];
      const [movedItem] = newEntries.splice(fromIndex, 1);
      newEntries.splice(toIndex, 0, movedItem);
      return newEntries;
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <div className="flex flex-col md:flex-row h-screen">
        
        {/* Left Panel - Editor */}
        <div className="md:w-1/2 p-8 bg-slate-800 border-r border-slate-700 shadow-md">
          <h1 className="text-2xl font-semibold mb-4">📋 Daily Help Desk Log</h1>
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
                <div key={index} className="whitespace-pre-line border-b border-gray-300 pb-2 relative">
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
                    {entry.replace(/\*\*([^*]+)\*\*/g, (_, text) => `__BOLD_MARKER__${text}__BOLD_MARKER__`)
                          .split('\n').map((line, i) =>
                            line.includes('__BOLD_MARKER__') ? (
                              <div key={i}><strong>{line.replace(/__BOLD_MARKER__/g, '')}</strong></div>
                            ) : (
                              <div key={i}>{line}</div>
                            )
                          )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
