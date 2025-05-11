import "./TodoPopup.css";

export default function TodoPopup({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="todo-popup">
      <div className="todo-content">
        <h2>🛠️ Current To Do List</h2>
        <ul>
          <li>Add animation when balls reset</li>
          <li>Style 'Pit of Despair' sign</li>
          <li>Optimize mobile responsiveness</li>
          <li>Add new building for fitness projects</li>
          <li>Integrate more sound effects</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// TodoPopup.jsx
// import React, { useState } from "react";
// import "./TodoPopup.css";

// export default function TodoPopup({
//   visible,
//   // toDos,
//   // suggestions,
//   onClose,
//   onNewSuggestion, // ← a callback prop
// }) {
//   const [draft, setDraft] = useState("");

//   if (!visible) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!draft.trim()) return;
//     onNewSuggestion(draft.trim());
//     setDraft("");
//   };

//   const toDos = ["fix", "otherStuff", "this one", "and that one"];
//   const suggestions = ["try", "wall"];

//   return (
//     <div className="todo-popup-overlay" onClick={onClose}>
//       <div className="todo-popup" onClick={(e) => e.stopPropagation()}>
//         <h2>📝 To Do</h2>
//         <ul>
//           {toDos.map((item, i) => (
//             <li key={i}>{item}</li>
//           ))}
//         </ul>

//         <h3>💡 Suggestions</h3>
//         <ul>
//           {suggestions.map((s, i) => (
//             <li key={i}>{s}</li>
//           ))}
//         </ul>

//         <form onSubmit={handleSubmit} className="suggestion-form">
//           <input
//             type="text"
//             placeholder="What should I add next?"
//             value={draft}
//             onChange={(e) => setDraft(e.target.value)}
//           />
//           <button type="submit">Submit</button>
//         </form>

//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// }
