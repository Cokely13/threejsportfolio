import React from "react";
import "./AboutSectionPopup.css";

export default function AboutSectionPopup({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="about-section-overlay" onClick={onClose}>
      <div className="about-section-popup" onClick={(e) => e.stopPropagation()}>
        <h2>👤 About This Section</h2>
        <p>
          Head up the ramp to learn more about my background, and the story
          behind this portfolio!
        </p>
        <div className="button-close">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
