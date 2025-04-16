import { useMemo } from "react";
import { RigidBody } from "@react-three/rapier";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export default function TodoBoard({ position = [0, 0, 0], items = [] }) {
  const boardColor = "#3e2723"; // Dark wood
  const textColor = "#ffffff";
  const borderColor = "#8d6e63"; // Lighter wood

  return (
    <RigidBody type="fixed" colliders="cuboid">
      {/* Board panel */}
      <mesh position={[position[0], position[1] + 2, position[2]]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color={boardColor} />
      </mesh>

      {/* Border frame */}
      <mesh position={[position[0], position[1] + 2.01, position[2]]}>
        <planeGeometry args={[6.2, 4.2]} />
        <meshBasicMaterial color={borderColor} side={THREE.DoubleSide} />
      </mesh>

      {/* Title */}
      <Text
        position={[position[0], position[1] + 3.5, position[2] + 0.1]}
        fontSize={0.4}
        color={textColor}
        anchorX="center"
        anchorY="middle"
      >
        TO DO LIST
      </Text>

      {/* List items */}
      {items.map((item, i) => (
        <Text
          key={i}
          position={[position[0], position[1] + 3 - i * 0.5, position[2] + 0.1]}
          fontSize={0.3}
          maxWidth={5.5}
          anchorX="center"
          anchorY="middle"
          color={textColor}
        >
          • {item}
        </Text>
      ))}
    </RigidBody>
  );
}
