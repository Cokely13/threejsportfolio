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
