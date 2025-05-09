import React from "react";
import "./SkillsPopup.css";

export default function SkillsPopup({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="skills-popup-overlay" onClick={onClose}>
      <div className="skills-popup" onClick={(e) => e.stopPropagation()}>
        <h2>📂 Skillss</h2>
        <ul>Check out the skills!</ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
