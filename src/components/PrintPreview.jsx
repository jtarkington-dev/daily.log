import React from 'react';


export default function PrintPreview({ logEntries }) {
  return (
    <div className="print-preview-area">
      <style>{`
        .print-preview-area {
          font-family: 'Inter', sans-serif;
          background: #fff;
          color: #1a1a1a;
          padding: 60px;
          max-width: 800px;
          margin: auto;
        }
        .print-header {
          text-align: center;
          font-size: 30px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .export-meta {
          text-align: center;
          color: #555;
          font-size: 14px;
          margin-bottom: 40px;
        }
        .log-entry {
          border: 1px solid #e1e1e1;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.03);
        }
        .log-meta {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }
        .log-section {
          margin: 10px 0;
          font-size: 15px;
        }
        .log-section b {
          color: #000;
        }
        .log-notes {
          margin-top: 6px;
          padding: 12px;
          background: #f4f8ff;
          border-left: 4px solid #3490dc;
          font-size: 14px;
          white-space: pre-wrap;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #999;
          margin-top: 40px;
        }
      `}</style>

      <div className="print-header">🛠️ DeskOps Journal</div>
      <div className="export-meta">Exported on {new Date().toLocaleDateString()}</div>

      {logEntries.map((entry, i) => (
  <div key={i} className="log-entry">
    <div className="log-meta">📅 {entry.date || "—"} | ⏰ {entry.startTime || "—"}{entry.endTime ? ` – ${entry.endTime}` : ''}</div>
    <div className="log-section"><b>🧩 Task:</b> {entry.task || "—"}</div>
    <div className="log-section"><b>✅ Result:</b> {entry.result || "—"}</div>
    <div className="log-section"><b>📝 Notes:</b></div>
    <div className="log-notes">
      {entry.notes?.trim()
        ? entry.notes.trim().split('\n').map((line, j) => <div key={j}>{line}</div>)
        : "—"}
    </div>
  </div>
))}

        <div className="footer">Created by Jeremy Tarkington</div>
    </div>
  );
}
