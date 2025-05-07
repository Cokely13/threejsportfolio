// AboutBuilding.jsx
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";

// decorative pieces
import DoorFrame from "./DoorFrame";
import Window from "./Window";
import Lantern from "./Lantern";
import Marquee from "./Marquee";

export default function AboutBuilding({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [3, 2, 4],
  onEnter,
}) {
  const ref = useRef();
  const { scene } = useGLTF("/models/firstBuild.glb");

  // Simple two-color scheme: base vs. roof
  const baseMaterial = useRef(
    new THREE.MeshStandardMaterial({
      color: "#BBBBBB",
      roughness: 1,
      metalness: 0,
    })
  ).current;
  const roofMaterial = useRef(
    new THREE.MeshStandardMaterial({
      color: "#333333",
      roughness: 1,
      metalness: 0,
    })
  ).current;

  // Apply baseMaterial to "Cube" and roofMaterial to "Cube001"
  useEffect(() => {
    scene.traverse((c) => {
      if (!c.isMesh) return;
      c.castShadow = c.receiveShadow = true;
      if (c.name === "Cube") {
        c.material = baseMaterial;
      } else if (c.name === "Cube001") {
        c.material = roofMaterial;
      }
      c.material.needsUpdate = true;
    });
  }, [scene, baseMaterial, roofMaterial]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <RigidBody ref={ref} type="fixed" colliders={false}>
        {/* Building shell */}
        <primitive object={scene} castShadow />

        {/* Door frame */}
        <DoorFrame
          position={[4, -0.2, -0.48]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1, 1, 1]}
        />

        {/* Windows */}
        <Window
          position={[4.1, 5, 2.15]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[0.5, 1, 0.1]}
        />
        <Window
          position={[4.1, 5, -3]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[0.5, 1, 0.1]}
        />

        {/* Marquee above door */}
        {/* <Marquee
          position={[4, 4.4, -0.45]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1.5, 0.3, 0.1]}
        /> */}

        {/* Lanterns */}
        <Lantern position={[4, 2.5, 1]} rotation={[0, 0, 0]} />
        <Lantern position={[4, 2.5, -1.9]} rotation={[0, 0, 0]} />

        {/* Trigger collider */}
        <CuboidCollider
          sensor
          args={[5, 5, 5]}
          position={[0, 2, 1]}
          onIntersectionEnter={({ other }) => {
            if (other.rigidBodyObject?.name === "player") onEnter();
          }}
        />
      </RigidBody>
    </group>
  );
}
