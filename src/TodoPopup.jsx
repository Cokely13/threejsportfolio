// import "./TodoPopup.css";

// export default function TodoPopup({ visible, onClose }) {
//   if (!visible) return null;

//   return (
//     <div className="todo-popup">
//       <div className="todo-content">
//         <h2>🛠️ Current To Do List</h2>
//         <ul>
//           <li>Update style of buildings</li>
//           <li>Add animation when balls reset</li>
//           <li>Integrate more sound effects</li>
//           <li>Add Additional games</li>
//         </ul>
//         <div className="button-close">
//           <button onClick={onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/TodoPopup.jsx
import React, { useState } from "react";
import "./TodoPopup.css";

export default function TodoPopup({
  visible,
  onClose,
  suggestions = [],
  onNewSuggestion,
}) {
  const [draft, setDraft] = useState("");

  if (!visible) return null;

  return (
    <div className="todo-popup">
      <div className="todo-content">
        <h2>🛠️ Current To Do List</h2>
        <ul>
          <li>Update style of buildings</li>
          <li>Add animation when balls reset</li>
          <li>Integrate more sound effects</li>
          <li>Add Additional games</li>
        </ul>

        {/* ─── Suggestions ─────────────────────────── */}
        <h3>💡 Your Suggestions</h3>
        <ul className="suggestions-list">
          {suggestions.length > 0 ? (
            suggestions.map((s, i) => <li key={i}>{s}</li>)
          ) : (
            <li>
              <em>No suggestions yet!</em>
            </li>
          )}
        </ul>

        {/* ─── Input Form ──────────────────────────── */}
        <form
          className="suggestion-form"
          onSubmit={(e) => {
            e.preventDefault();
            const text = draft.trim();
            if (!text) return;
            onNewSuggestion(text);
            setDraft("");
          }}
        >
          <input
            type="text"
            placeholder="What should I add next?"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>

        <div className="button-close">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
