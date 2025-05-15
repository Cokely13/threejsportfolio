import React, { useState, useEffect } from "react";
import "./AboutPopup.css";

const travelPhotos = [
  "/assets/img/travel/paris1.jpg",
  "/assets/img/travel/paris2.jpg",
  "/assets/img/travel/paris3.jpg",
];

const readingPhotos = [
  "/assets/img/reading/book1.jpg",
  "/assets/img/reading/book2.jpg",
  "/assets/img/reading/book3.jpg",
];

const racePhotos = [
  "/assets/img/races/lakeTahoe1.jpg",
  "/assets/img/races/lakeTahoe2.jpg",
  "/assets/img/races/lakeTahoe3.jpg",
];

export default function AboutPopup({ visible, onClose }) {
  const [carousel, setCarousel] = useState({
    visible: false,
    photos: [],
    title: "",
    current: 0,
  });

  useEffect(() => {
    let timer;
    if (carousel.visible && carousel.photos.length > 1) {
      timer = setInterval(() => {
        setCarousel((c) => ({
          ...c,
          current: (c.current + 1) % c.photos.length,
        }));
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [carousel]);

  const openCarousel = (title, photos) => {
    setCarousel({ visible: true, title, photos, current: 0 });
  };

  const closeCarousel = () => {
    setCarousel({ ...carousel, visible: false });
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCarousel((c) => ({
      ...c,
      current: (c.current + c.photos.length - 1) % c.photos.length,
    }));
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setCarousel((c) => ({
      ...c,
      current: (c.current + 1) % c.photos.length,
    }));
  };

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
              <a
                href="#!"
                className="link-button"
                onClick={(e) => {
                  console.log("Travel Photos clicked");
                  e.preventDefault();
                  openCarousel("Travel Photos", travelPhotos);
                }}
              >
                Travel ✈️
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="link-button"
                onClick={(e) => {
                  e.preventDefault();
                  openCarousel("Reading List", readingPhotos);
                }}
              >
                Reading 📚
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="link-button"
                onClick={(e) => {
                  e.preventDefault();
                  openCarousel("Next Race", racePhotos);
                }}
              >
                Triathlons &amp; fitness challenges 🏊‍♂️🚴‍♂️🏃‍♂️
              </a>
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

      {/* Carousel Popup */}
      {carousel.visible && (
        <div className="mini-popup-overlay" onClick={closeCarousel}>
          <div
            className="mini-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>{carousel.title}</h4>
            <div className="carousel-container">
              <button className="arrow prev" onClick={prevSlide}>
                ‹
              </button>
              <img
                src={carousel.photos[carousel.current]}
                alt={`${carousel.title} ${carousel.current + 1}`}
              />
              <button className="arrow next" onClick={nextSlide}>
                ›
              </button>
            </div>
            <div className="button-close">
              <button onClick={closeCarousel}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
