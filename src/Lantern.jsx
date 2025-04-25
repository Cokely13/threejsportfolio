// src/components/Lantern.jsx
import React from "react";

export default function Lantern({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  radius = 0.2,
  color = "#ffeeaa",
  emissive = "#ffeeaa",
  emissiveIntensity = 1,
  showHook = true,
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* optional metal hook */}
      {showHook && (
        <mesh position={[0, radius + 0.1, 0]}>
          <torusGeometry args={[radius * 0.4, radius * 0.05, 8, 16]} />
          <meshStandardMaterial color="#555" />
        </mesh>
      )}
      {/* glowing lantern */}
      <mesh position={[0, radius, 0]}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </group>
  );
}
