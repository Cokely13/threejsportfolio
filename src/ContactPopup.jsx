// // ContactPopup.jsx
// import React from "react";

// export default function ContactPopup({ visible, onClose }) {
//   if (!visible) return null;

//   return (
//     <div className="popup-overlay" onClick={onClose}>
//       <div className="popup" onClick={(e) => e.stopPropagation()}>
//         <h2>Contact Me</h2>
//         <p>
//           Email:{" "}
//           <a href="mailto:ryan.cokely@gmail.com">ryan.cokely@gmail.com</a>
//         </p>

//         <form
//           target="_blank"
//           action="https://formsubmit.co/ryan.cokely@gmail.com"
//           method="POST"
//           style={{ marginTop: "20px" }}
//         >
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             required
//             style={{
//               display: "block",
//               width: "100%",
//               marginBottom: "10px",
//               padding: "10px",
//             }}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             required
//             style={{
//               display: "block",
//               width: "100%",
//               marginBottom: "10px",
//               padding: "10px",
//             }}
//           />
//           <textarea
//             name="message"
//             placeholder="Your Message"
//             rows="5"
//             required
//             style={{
//               display: "block",
//               width: "100%",
//               marginBottom: "10px",
//               padding: "10px",
//             }}
//           ></textarea>
//           <button
//             type="submit"
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#1e90ff",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Send
//           </button>
//         </form>

//         <button
//           onClick={onClose}
//           style={{
//             marginTop: "15px",
//             backgroundColor: "gray",
//             color: "white",
//             padding: "8px 15px",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// ContactPopup.jsx
import React from "react";
import "./ContactPopup.css";

export default function ContactPopup({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="contact-popup-overlay" onClick={onClose}>
      <div className="contact-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Contact Me</h2>
        <p>
          Email:{" "}
          <a href="mailto:ryan.cokely@gmail.com" style={{ color: "#00ffff" }}>
            ryan.cokely@gmail.com
          </a>
        </p>

        <form
          target="_blank"
          action="https://formsubmit.co/ryan.cokely@gmail.com"
        >
          <input type="text" name="name" placeholder="Full Name" required />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
          />
          <button type="submit">Send</button>
        </form>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
