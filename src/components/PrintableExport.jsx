import React from "react";

export default function PrintableExport({ logEntries }) {
  return (
    <div id="print-area" style={{ padding: "40px", fontFamily: "Inter, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px", fontSize: "2em" }}>Daily Help Desk Log</h1>
      <p style={{ textAlign: "center", marginBottom: "30px", fontSize: "1em", color: "#555" }}>
        Exported on {new Date().toLocaleDateString()}
      </p>
      {logEntries.map((entry, index) => (
        <div key={index} style={{ marginBottom: "30px", borderBottom: "1px solid #ccc", paddingBottom: "20px" }}>
          <p><strong>Date:</strong> {entry.date}</p>
          <p><strong>Start Time:</strong> {entry.startTime}</p>
          <p><strong>End Time:</strong> {entry.endTime}</p>
          <p><strong>Task:</strong> {entry.task}</p>
          <p><strong>Result:</strong> {entry.result}</p>
          <p><strong>Notes:</strong></p>
          <div style={{ whiteSpace: "pre-wrap", marginLeft: "20px", fontSize: "0.95em", color: "#333" }}>
            {entry.notes}
          </div>
        </div>
      ))}
    </div>
  );
}
