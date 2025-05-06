// components/AboutPopup.jsx
import React from "react";
import "./AboutPopup.css";

export default function AboutPopup({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="about-popup-overlay" onClick={onClose}>
      <div className="about-popup" onClick={(e) => e.stopPropagation()}>
        <h2>👋 About Me</h2>
        <h3>Ryan Cokely</h3>
        <p>Turning ideas into production‑ready full‑stack apps.</p>
        <p>
          Passionate about learning, I enjoy experimenting with new
          technologies, designing and building full‑stack websites and
          applications.
        </p>

        <h4>Other Interests</h4>
        <ul>
          <li>Travel ✈️</li>
          <li>Reading 📚</li>
          <li>Triathlons & fitness challenges 🏊‍♂️🚴‍♂️🏃‍♂️</li>
          <li>Mountain biking & coffee snob ☕️</li>
        </ul>

        <h4>Get in Touch</h4>
        <ul className="contact">
          <li>
            🔗{" "}
            <a
              href="https://github.com/Cokely13"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Cokely13
            </a>
          </li>
          <li>💼 Freelance: Available</li>
          <li>📧 ryan.cokely@gmail.com</li>
        </ul>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
