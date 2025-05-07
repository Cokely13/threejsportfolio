import React from "react";
import "./GameOverPopup.css";

export default function GameOverPopup({ visible, onYes, onNo }) {
  if (!visible) return null;
  return (
    <div className="gameover-overlay">
      <div className="gameover-modal">
        <h2>Game Over!</h2>
        <p>Want to play again?</p>
        <div className="gameover-buttons">
          <button className="yes" onClick={onYes}>
            Yes
          </button>
          <button className="no" onClick={onNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
