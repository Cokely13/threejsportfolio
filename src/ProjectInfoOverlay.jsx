// import React, { useState } from "react";
// import { FaExternalLinkAlt, FaGithub, FaYoutube } from "react-icons/fa";
// import "./ProjectInfoOverlay.css";

// export default function ProjectInfoOverlay({ project, onClose }) {
//   console.log("project", project);
//   const [current, setCurrent] = useState(0);
//   if (!project) return null;

//   // pull exactly the keys we know exist
//   const {
//     name,
//     description,
//     url,
//     github,
//     youtube,
//     screenshots = [],
//     image,
//   } = project;

//   // if no screenshots array, default to single `image`
//   const slides = screenshots.length ? screenshots : [image];

//   return (
//     <div className="project-overlay">
//       <div className="project-card">
//         <button className="close-btn" onClick={onClose}>
//           ✕
//         </button>

//         {/* Screenshot carousel */}
//         <div className="project-hero">
//           <img
//             src={slides[current]}
//             alt={`${name} screenshot ${current + 1}`}
//           />
//           {slides.length > 1 && (
//             <div className="carousel-controls">
//               <button
//                 onClick={() =>
//                   setCurrent((current + slides.length - 1) % slides.length)
//                 }
//               >
//                 ‹
//               </button>
//               <button onClick={() => setCurrent((current + 1) % slides.length)}>
//                 ›
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Title & Description */}
//         <h2>{name}</h2>
//         <p className="desc">{description}</p>

//         {/* Action Links */}
//         <div className="links">
//           {url && (
//             <a
//               href={url}
//               className="btn live-demo"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               ▶️ Live Demo <FaExternalLinkAlt />
//             </a>
//           )}
//           {github && (
//             <a
//               href={github}
//               className="btn github"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaGithub /> Source
//             </a>
//           )}
//           {youtube && (
//             <a
//               href={youtube}
//               className="btn youtube"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaYoutube /> Watch
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// src/ProjectInfoOverlay.jsx

import React, { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaYoutube } from "react-icons/fa";
import "./ProjectInfoOverlay.css";

export default function ProjectInfoOverlay({ project, onClose }) {
  const [current, setCurrent] = useState(0);
  if (!project) return null;

  // pull exactly the keys we know exist
  const {
    name,
    description,
    url,
    github,
    youtube,
    screenshots = [],
    image,
  } = project;

  // console.log("project", project);

  // if no screenshots array, default to single `image`
  const slides = screenshots.length ? screenshots : [image];

  return (
    <div className="project-overlay">
      <div className="project-card">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Screenshot carousel */}
        <div className="project-hero">
          <img
            src={slides[current]}
            alt={`${name} screenshot ${current + 1}`}
          />
          {slides.length > 1 && (
            <div className="carousel-controls">
              <button
                onClick={() =>
                  setCurrent((current + slides.length - 1) % slides.length)
                }
              >
                ‹
              </button>
              <button onClick={() => setCurrent((current + 1) % slides.length)}>
                ›
              </button>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h2>{name}</h2>
        <p className="desc">{description}</p>

        {/* Action Links */}
        <div className="links">
          {url && (
            <a
              href={url}
              className="btn live-demo"
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶️ Live Demo <FaExternalLinkAlt />
            </a>
          )}
          {github && (
            <a
              href={github}
              className="btn github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> Source
            </a>
          )}
          {youtube && (
            <a
              href={youtube}
              className="btn youtube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube /> Watch
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
