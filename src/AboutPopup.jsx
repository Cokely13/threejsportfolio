// // components/AboutPopup.jsx
// import React from "react";
// import "./AboutPopup.css";

// export default function AboutPopup({ visible, onClose }) {
//   if (!visible) return null;

//   return (
//     <div className="about-popup-overlay" onClick={onClose}>
//       <div className="about-popup" onClick={(e) => e.stopPropagation()}>
//         <h2>👋 About Me</h2>
//         <h3>Ryan Cokely</h3>
//         <p>Turning ideas into production‑ready full‑stack apps.</p>
//         <p>
//           Passionate about learning, I enjoy experimenting with new
//           technologies, designing and building full‑stack websites and
//           applications.
//         </p>

//         <h4>Other Interests</h4>
//         <ul>
//           <li>Travel ✈️</li>
//           <li>Reading 📚</li>
//           <li>Triathlons & fitness challenges 🏊‍♂️🚴‍♂️🏃‍♂️</li>
//           <li>Volunteering</li>
//         </ul>

//         <h4>Get in Touch</h4>
//         <ul className="contact">
//           <li>
//             🔗{" "}
//             <a
//               href="https://github.com/Cokely13"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               github.com/Cokely13
//             </a>
//           </li>
//           <li>💼 Freelance: Available</li>
//           <li>📧 ryan.cokely@gmail.com</li>
//           <li>
//             📄{" "}
//             <a
//               href="https://docs.google.com/document/d/1mKoyA6Yo7mY6CGV6KY--TiGGv823leAv/edit"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               View my resume
//             </a>
//           </li>
//         </ul>
//         <div className="button-close">
//           <button onClick={onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import "./AboutPopup.css";

export default function AboutPopup({ visible, onClose }) {
  const [showTrip, setShowTrip] = useState(false);
  const [showRace, setShowRace] = useState(false);

  if (!visible) return null;

  return (
    <>
      {/* Main About Overlay */}
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
            <li>
              Travel ✈️ —{" "}
              <button className="link-button" onClick={() => setShowTrip(true)}>
                See my next destination
              </button>
            </li>
            <li>
              Reading 📚 —{" "}
              <a
                href="https://www.goodreads.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-button"
              >
                See what I’m reading
              </a>
            </li>
            <li>
              Triathlons & fitness challenges 🏊‍♂️🚴‍♂️🏃‍♂️ —{" "}
              <button className="link-button" onClick={() => setShowRace(true)}>
                See my next race
              </button>
            </li>
            <li>Volunteering</li>
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
            <li>
              📧{" "}
              <a href="mailto:ryan.cokely@gmail.com">ryan.cokely@gmail.com</a>
            </li>
            <li>
              📄{" "}
              <a
                href="https://docs.google.com/document/d/1mKoyA6Yo7mY6CGV6KY--TiGGv823leAv/edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                View my resume
              </a>
            </li>
          </ul>

          <div className="button-close">
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      {/* Popup: Next Destination */}
      {showTrip && (
        <div className="mini-popup-overlay" onClick={() => setShowTrip(false)}>
          <div
            className="mini-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Next Destination</h4>
            <p>Paris, France — June 2025</p>
            <button onClick={() => setShowTrip(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Popup: Next Race */}
      {showRace && (
        <div className="mini-popup-overlay" onClick={() => setShowRace(false)}>
          <div
            className="mini-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Next Race</h4>
            <p>Lake Tahoe Triathlon — July 12, 2025</p>
            <button onClick={() => setShowRace(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
