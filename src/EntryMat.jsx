// EntryMat.jsx
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";

export default function EntryMat({
  position = [0, 0.01, -20],
  rotation = [0, 0, 0],
  width = 10,
  height = 4,
  thickness = 0.2,
  pulseSpeed = 2,
  pulseAmount = 0.05,
  onEnter, // ← accept callback
}) {
  const groupRef = useRef();
  const frameRef = useRef();

  const frameGeo = useMemo(() => {
    const shape = new THREE.Shape()
      .moveTo(-width / 2, -height / 2)
      .lineTo(-width / 2, height / 2)
      .lineTo(width / 2, height / 2)
      .lineTo(width / 2, -height / 2)
      .closePath();
    const hole = new THREE.Path();
    const w2 = width / 2 - thickness;
    const h2 = height / 2 - thickness;
    hole
      .moveTo(-w2, -h2)
      .lineTo(-w2, h2)
      .lineTo(w2, h2)
      .lineTo(w2, -h2)
      .closePath();
    shape.holes.push(hole);
    return new THREE.ShapeGeometry(shape);
  }, [width, height, thickness]);

  // pulse animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * pulseSpeed) * pulseAmount;
    groupRef.current?.scale.set(pulse, pulse, pulse);
    if (frameRef.current)
      frameRef.current.material.emissiveIntensity =
        0.5 + Math.sin(t * pulseSpeed) * 0.3;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* 1) the collider sensor sits at the same spot as your mat */}
      <CuboidCollider
        sensor
        args={[width / 2, 0.1, height / 2]}
        position={[0, 0.05, 0]}
        onIntersectionEnter={(e) => {
          if (e.rigidBody?.userData?.isPlayer) {
            onEnter?.();
          }
        }}
      />
    </group>
  );
}
