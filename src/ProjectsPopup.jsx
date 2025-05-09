import React from "react";
import "./ProjectsPopup.css";

export default function ProjectsPopup({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="projects-popup-overlay" onClick={onClose}>
      <div className="projects-popup" onClick={(e) => e.stopPropagation()}>
        <h2>📂 Projects</h2>
        <ul>Enter any of the buildings for more details on each project!</ul>
        <div className="button-close">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
