import React, { useState } from 'react';
import { format } from 'date-fns';

const LogEditor = ({ onUpdate }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [task, setTask] = useState('');
  const [result, setResult] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const timestamp = format(new Date(), 'yyyy-MM-dd');
    const timeRange = startTime ? `**Time:** ${startTime}${endTime ? ` – ${endTime}` : ''}` : '';
  
    const formattedEntry = `**${timestamp}**  
  ${timeRange}  
    
  **Task:** ${task}  
  **Result:** ${result}  
  **Notes:** ${notes}  
  ---
  `;
  
    onUpdate(formattedEntry);
  
    // clear form
    setTask('');
    setResult('');
    setNotes('');
    setStartTime('');
    setEndTime('');
  };   

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 h-full p-6 bg-slate-800 text-slate-100 rounded-lg shadow-inner"
    >
      <label htmlFor="log-entry" className="text-sm text-zinc-400">
        New Log Entry
      </label>

      <div className="flex gap-4 items-center text-sm mb-4">
  <div className="flex flex-col">
    <label htmlFor="start-time" className="text-slate-300 mb-1">Start</label>
    <input
      type="time"
      id="start-time"
      value={startTime}
      onChange={(e) => setStartTime(e.target.value)}
      className="bg-slate-700 text-white px-2 py-1 rounded border border-slate-600"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="end-time" className="text-slate-300 mb-1">End (optional)</label>
    <input
      type="time"
      id="end-time"
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)}
      className="bg-slate-700 text-white px-2 py-1 rounded border border-slate-600"
    />
  </div>
</div>


<div className="flex flex-col gap-2">
  <label className="text-sm text-slate-300">Task</label>
  <input
    type="text"
    value={task}
    onChange={(e) => setTask(e.target.value)}
    placeholder="Example: Reset user password"
    className="p-2 rounded bg-zinc-800 text-white border border-zinc-600"
  />

  <label className="text-sm text-slate-300">Result</label>
  <input
    type="text"
    value={result}
    onChange={(e) => setResult(e.target.value)}
    placeholder="Example: Resolved successfully"
    className="p-2 rounded bg-zinc-800 text-white border border-zinc-600"
  />

  <label className="text-sm text-slate-300">Notes</label>
  <textarea
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
    placeholder="Example: Followed up with user, all working fine"
    rows={3}
    className="resize-none p-2 rounded bg-zinc-800 text-white border border-zinc-600"
  />
</div>

      <button
        type="submit"
        className="self-start px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add to Log
      </button>
    </form>
  );
};

export default LogEditor;
