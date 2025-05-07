import React from "react";
import "./ContactSectionPopup.css";

export default function ContactSectionPopup({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="contact-section-overlay" onClick={onClose}>
      <div
        className="contact-section-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>📬 Get In Touch</h2>
        <ul>
          <li>Head up the ramp and enter the building!</li>
          <li>
            GitHub:{" "}
            <a
              href="https://github.com/Cokely13"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Cokely13
            </a>
          </li>
          {/* <li>Freelance: Available</li> */}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
