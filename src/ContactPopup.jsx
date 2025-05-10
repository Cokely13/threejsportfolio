// ContactPopup.jsx
// import React from "react";
// import "./ContactPopup.css";

// export default function ContactPopup({ visible, onClose }) {
//   if (!visible) return null;

//   return (
//     <div className="contact-popup-overlay" onClick={onClose}>
//       <div className="contact-popup" onClick={(e) => e.stopPropagation()}>
//         <h2>Contact Me</h2>
//         <p>
//           Email:{" "}
//           <a href="mailto:ryan.cokely@gmail.com" style={{ color: "#00ffff" }}>
//             ryan.cokely@gmail.com
//           </a>
//         </p>

//         <form
//           target="_blank"
//           action="https://formsubmit.co/ryan.cokely@gmail.com"
//         >
//           <input type="text" name="name" placeholder="Full Name" required />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             required
//           />
//           <textarea
//             name="message"
//             placeholder="Your Message"
//             rows="5"
//             required
//           />
//           <button type="submit">Send</button>
//         </form>

//         <button className="close-btn" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import "./ContactPopup.css";

// export default function ContactPopup({ visible, onClose }) {
//   if (!visible) return null;

//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = () => {
//     // delay to allow form to submit before showing thank-you message
//     setTimeout(() => setSubmitted(true), 100);
//   };

//   return (
//     <div className="contact-popup-overlay" onClick={onClose}>
//       <div className="contact-popup" onClick={(e) => e.stopPropagation()}>
//         <h2>Contact Me</h2>

//         {!submitted ? (
//           <>
//             <p>
//               Email:{" "}
//               <a
//                 href="mailto:ryan.cokely@gmail.com"
//                 style={{ color: "#00ffff" }}
//               >
//                 ryan.cokely@gmail.com
//               </a>
//             </p>

//             <form
//               action="https://formsubmit.co/ryan.cokely@gmail.com"
//               method="POST"
//               target="_blank"
//               onSubmit={handleSubmit}
//             >
//               {/* Disable built‑in CAPTCHA and set custom subject/redirect */}
//               <input type="hidden" name="_captcha" value="false" />
//               <input
//                 type="hidden"
//                 name="_subject"
//                 value="New message from portfolio"
//               />
//               {/* Optional: redirect on success */}
//               <input
//                 type="hidden"
//                 name="_next"
//                 value="https://yourdomain.com/thank-you"
//               />

//               <input type="text" name="name" placeholder="Full Name" required />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 required
//               />
//               <textarea
//                 name="message"
//                 placeholder="Your Message"
//                 rows="5"
//                 required
//               />

//               <button type="submit">Send</button>
//             </form>
//           </>
//         ) : (
//           <p>Thanks for your message! I'll get back to you soon.</p>
//         )}

//         <button className="close-btn" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import "./ContactPopup.css";

export default function ContactPopup({ visible, onClose }) {
  if (!visible) return null;

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.target);

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/48dab0b95f07970a07e68bccf88c827b",
        { method: "POST", body: formData }
      );

      if (!res.ok) {
        throw new Error(`Submission failed with status ${res.status}`);
      }

      // Successful 2xx response
      setSubmitted(true);
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Oops! Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="contact-popup-overlay" onClick={onClose}>
      <div className="contact-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Contact Me</h2>

        {error && <p className="error-message">{error}</p>}

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_subject"
              value="New message from portfolio"
            />
            <input type="text" name="_honey" style={{ display: "none" }} />

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
        ) : (
          <p className="thank-you-message">
            Thanks for your message! I'll get back to you soon.
          </p>
        )}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
