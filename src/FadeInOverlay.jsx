// FadeInOverlay.jsx
import { useState, useEffect } from "react";
import { Html } from "@react-three/drei";

export default function FadeInOverlay() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setOpacity((prev) => {
        if (prev <= 0) {
          clearInterval(fadeInterval);
          return 0;
        }
        return prev - 0.01; // fade speed (lower = slower)
      });
    }, 30); // every 30ms

    return () => clearInterval(fadeInterval);
  }, []);

  return (
    <Html fullscreen style={{ pointerEvents: "none" }}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          opacity: opacity,
          transition: "opacity 0.5s",
        }}
      />
    </Html>
  );
}
