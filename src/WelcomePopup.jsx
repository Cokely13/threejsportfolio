// components/WelcomePopup.jsx
import React from "react";
import "./WelcomePopup.css";

export default function WelcomePopup({ visible, onClose, features }) {
  if (!visible) return null;

  return (
    <div className="welcome-overlay" onClick={onClose}>
      <div className="welcome-popup" onClick={(e) => e.stopPropagation()}>
        <h2>🎉 Welcome To Ryan Cokely’s Portfolio!</h2>
        <p>
          Feel free to explore the world and check out all of the following
          features:
        </p>
        <ul className="welcome-features">
          {features.map((feat, i) => (
            <li key={i}>{feat}</li>
          ))}
        </ul>
        <button className="welcome-close" onClick={onClose}>
          Let’s Go!
        </button>
      </div>
    </div>
  );
}
