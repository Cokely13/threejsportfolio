// components/GamesRulesPopup.jsx
import React from "react";
import "./GamesRulesPopup.css";

export default function GamesRulesPopup({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="gamesrules-popup-overlay" onClick={onClose}>
      <div className="gamesrules-popup" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h2>🎯 Skeeball Game Rules</h2>
        </div>
        <p>
          Roll as many balls through the rings as you can! If a ball hits the
          back wall or leaves the play area, you lose it. Try to beat today’s
          high score!
        </p>
        <div className="button-close">
          <button onClick={onClose}>Good Luck!</button>
        </div>
      </div>
    </div>
  );
}
