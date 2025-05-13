import React from "react";
import "./SkillsPopup.css";

export default function SkillsPopup({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="skills-popup-overlay" onClick={onClose}>
      <div className="skills-popup" onClick={(e) => e.stopPropagation()}>
        <h2>📂 Skills</h2>
        <p>
          Head up the ramp and see the different technologies I use to create my
          projects. Watch out for the falling balls!
        </p>
        <div className="skills-close">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
