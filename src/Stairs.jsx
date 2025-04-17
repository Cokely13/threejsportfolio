// components/Stairs.jsx
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";

export default function Stairs({
  position = [0, 0, 0],
  steps = 8,
  stepSize = [4, 0.5, 1], // [width, height, depth]
  color = "#888",
}) {
  const totalHeight = steps * stepSize[1];
  const totalDepth = steps * stepSize[2];

  return (
    <group position={position}>
      {/* 🎯 Visual steps */}
      {Array.from({ length: steps }).map((_, i) => (
        <mesh key={i} position={[0, i * stepSize[1], -i * stepSize[2]]}>
          <boxGeometry args={stepSize} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}

      {/* 🛠️ Invisible ramp collider */}
      <RigidBody type="fixed" friction={1} restitution={0}>
        <mesh
          position={[0, totalHeight / 2, -totalDepth / 2]}
          rotation={[-Math.atan(totalHeight / totalDepth), 0, 0]}
          visible={false} // Make this true for debugging if needed
        >
          <boxGeometry args={[stepSize[0], totalHeight, totalDepth]} />
          <meshStandardMaterial color="red" transparent opacity={0.3} />
        </mesh>
      </RigidBody>
    </group>
  );
}
