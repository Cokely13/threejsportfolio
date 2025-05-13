// src/Window.jsx
import React from "react";

export default function Window({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 2,
  height = 2.5,
  thickness = 0.2,
  frameColor = "#333333",
  centerColor = "#ffffff",
}) {
  // half-sizes
  const w2 = width / 2;
  const h2 = height / 2;
  const t2 = thickness / 2;

  // frame panels: left, right, top, bottom
  const panels = [
    { x: -w2 + t2, y: 0, w: thickness, h: height }, // left
    { x: +w2 - t2, y: 0, w: thickness, h: height }, // right
    { x: 0, y: +h2 - t2, w: width, h: thickness }, // top
    { x: 0, y: -h2 + t2, w: width, h: thickness }, // bottom
  ];

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      {panels.map(({ x, y, w, h }, i) => (
        <mesh key={i} position={[x, y, 0]}>
          <boxGeometry args={[w, h, thickness]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
      ))}

      {/* Center panel */}
      <mesh position={[0, 0, -t2]}>
        <planeGeometry args={[width - thickness, height - thickness]} />
        <meshStandardMaterial color={centerColor} metalness={0} roughness={1} />
      </mesh>
    </group>
  );
}
