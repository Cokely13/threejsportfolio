// src/components/Window.jsx
import React from "react";

export default function Window({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 1,
  height = 1.5,
  thickness = 0.05,
  color = "#88ccff",
  opacity = 0.4,
  roughness = 0.1,
  metalness = 0,
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[width, height, thickness]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        roughness={roughness}
        metalness={metalness}
      />
    </mesh>
  );
}
