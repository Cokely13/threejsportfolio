// src/components/Marquee.jsx
import React from "react";

export default function Marquee({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 2.2,
  height = 0.3,
  depth = 0.1,
  color = "#222",
  emissive = "#ffdd66",
  emissiveIntensity = 0.8,
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}
