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
    site,
    github,
    youtube,
    screenshots = [],
    image,
  } = project;

  const FADE_DURATION = 300;
  const slides = screenshots.length ? screenshots : [image];

  return (
    <div className="project-overlay">
      <div className="project-card">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="project-hero">
          {slides.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${name} screenshot ${idx + 1}`}
              className={`slide ${current === idx ? "visible" : ""}`}
              style={{ transition: `opacity ${FADE_DURATION}ms ease` }}
            />
          ))}

          {/* arrows */}
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

          {/* dots */}
          {slides.length > 1 && (
            <div className="carousel-dots">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className={idx === current ? "dot active" : "dot"}
                  onClick={() => setCurrent(idx)}
                />
              ))}
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
          {site && (
            <a
              href={site}
              className="btn site"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try It <FaExternalLinkAlt />
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
