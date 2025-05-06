// components/GamesRulesPopup.jsx
import React from "react";
import "./GamesRulesPopup.css";

export default function GamesRulesPopup({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="gamesrules-popup-overlay" onClick={onClose}>
      <div className="gamesrules-popup" onClick={(e) => e.stopPropagation()}>
        <h2>🎯 Skeeball Game Rules</h2>
        <ol>
          <li>
            You start with <strong>3 balls</strong>. Try to roll them up the
            ramp.
          </li>
          <li>
            Aim for the rings: <em>10, 20</em>, or <em>30 points</em> depending
            on which ring you hit.
          </li>
          <li>Each ball scored through a ring gives you another ball.</li>
          <li>
            If a ball misses all rings and goes past the back wall or off the
            front, you lose one ball.
          </li>
          <li>
            The game ends when <strong>Balls Remaining</strong> reaches{" "}
            <strong>0</strong>.
          </li>
        </ol>
        <h3>Leaderboard</h3>
        <p>
          Only scores achieved with all balls used count for the leaderboard.
        </p>
        <p>
          After your last ball, if your score beats today's high score, you'll
          be prompted to enter your name.
        </p>
        <button onClick={onClose}>Got it!</button>
      </div>
    </div>
  );
}
