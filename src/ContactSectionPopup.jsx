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
            Email:{" "}
            <a href="mailto:ryancokely@gmail.com">ryancokely@gmail.com</a>
          </li>
          {/* <li>Freelance: Available</li> */}
        </ul>
        <div className="button-close">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
