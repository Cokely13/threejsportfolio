// components/Stairs.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

useGLTF.preload("/models/stairs.glb");

export default function Stairs({
  src = "/models/stairs.glb",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  friction = 1,
  restitution = 0,
}) {
  const { scene } = useGLTF(src);

  return (
    <RigidBody
      type="fixed"
      colliders="trimesh" // ← precise triangle‐mesh collider
      friction={friction}
      restitution={restitution}
      position={position}
      rotation={rotation}
    >
      {/* visible stairs mesh */}
      <primitive object={scene} scale={scale} castShadow receiveShadow />
    </RigidBody>
  );
}
