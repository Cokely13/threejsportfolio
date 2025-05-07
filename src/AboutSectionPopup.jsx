import React from "react";
import "./AboutSectionPopup.css";

export default function AboutSectionPopup({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="about-section-overlay" onClick={onClose}>
      <div className="about-section-popup" onClick={(e) => e.stopPropagation()}>
        <h2>👤 About This Section</h2>
        <p>
          Here you can learn more about my background, skills, and the story
          behind this portfolio. Feel free to explore all the details!
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
