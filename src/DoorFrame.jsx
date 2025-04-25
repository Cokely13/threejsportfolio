// src/components/DoorFrame.jsx
import React from "react";

export default function DoorFrame({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  postHeight = 4.2,
  postWidth = 0.2,
  headerHeight = 0.2,
  headerDepth = 0.2,
  materialProps = { color: "#5C3A21", roughness: 0.8, metalness: 0.1 },
}) {
  const headerWidth = postWidth * 2 + 1.9; // adjust 1 → passage width
  return (
    <group position={position} rotation={rotation}>
      {/* Left post */}
      <mesh position={[-(headerWidth - postWidth) / 2, postHeight / 2, 0]}>
        <boxGeometry args={[postWidth, postHeight, postWidth]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      {/* Right post */}
      <mesh position={[(headerWidth - postWidth) / 2, postHeight / 2, 0]}>
        <boxGeometry args={[postWidth, postHeight, postWidth]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      {/* Header beam */}
      <mesh position={[0, postHeight + headerHeight / 2, 0]}>
        <boxGeometry args={[headerWidth, headerHeight, postWidth]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
