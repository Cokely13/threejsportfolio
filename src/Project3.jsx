// Project3.jsx
import React, { useEffect, useRef } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";

export default function Project3({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  onEnter,
  showDebug = false,
}) {
  const ref = useRef();
  const { scene } = useGLTF("/models/build3.glb");
  const style = {
    baseColor: "#2ecc71",
    roofColor: "#27ae60",
    trimColor: "#f1c40f",
    textColor: "#000000",
  };

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return;
      const lname = child.name.toLowerCase();
      let color = style.baseColor;
      if (lname.includes("roof")) color = style.roofColor;
      else if (lname.includes("trim") || lname.includes("frame"))
        color = style.trimColor;

      child.material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.7,
        metalness: 0.1,
      });
      child.castShadow = child.receiveShadow = true;
      child.material.needsUpdate = true;
    });
  }, [scene, style]);

  return (
    <RigidBody
      ref={ref}
      type="fixed"
      colliders={false}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <primitive object={scene} />
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.4}
        color={style.textColor}
        anchorX="center"
        anchorY="middle"
      >
        NewHorizons
      </Text>
      <CuboidCollider
        sensor
        args={[2, 2, 2]}
        position={[0, 1, 0]}
        onIntersectionEnter={({ other }) =>
          other.rigidBodyObject?.name === "player" && onEnter?.()
        }
      />
      {showDebug && (
        <mesh>
          <boxGeometry args={[4, 4, 4]} />
          <meshBasicMaterial color="hotpink" wireframe />
        </mesh>
      )}
    </RigidBody>
  );
}
