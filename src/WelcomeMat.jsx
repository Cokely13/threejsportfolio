// src/WelcomeMat.jsx
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WelcomeMat({
  position = [0, 0.01, -20],
  rotation = [0, 0, 0],
  width = 10,
  height = 4,
  color = "#000000",
  ringColor = "#ffee58",
  thickness = 0.2,
  pulseSpeed = 2, // how fast it pulses
  pulseAmount = 0.05, // scale variation
}) {
  const groupRef = useRef();
  const frameRef = useRef();

  // 1) Build a rectangular frame shape with a hole
  const frameGeo = useMemo(() => {
    const shape = new THREE.Shape()
      .moveTo(-width / 2, -height / 2)
      .lineTo(-width / 2, height / 2)
      .lineTo(width / 2, height / 2)
      .lineTo(width / 2, -height / 2)
      .lineTo(-width / 2, -height / 2);

    const hole = new THREE.Path();
    const w2 = width / 2 - thickness;
    const h2 = height / 2 - thickness;
    hole
      .moveTo(-w2, -h2)
      .lineTo(-w2, h2)
      .lineTo(w2, h2)
      .lineTo(w2, -h2)
      .lineTo(-w2, -h2);

    shape.holes.push(hole);
    return new THREE.ShapeGeometry(shape);
  }, [width, height, thickness]);

  // 2) On every frame, pulse both the group scale and the frame emissive
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * pulseSpeed) * pulseAmount;

    // scale the entire mat
    if (groupRef.current) {
      groupRef.current.scale.set(pulse, pulse, pulse);
    }

    // pulse the frame glow
    if (frameRef.current) {
      frameRef.current.material.emissiveIntensity =
        0.5 + Math.sin(t * pulseSpeed) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* mat base */}
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      </mesh> */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#000000" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* glowing rectangular frame */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={frameGeo} ref={frameRef}>
        <meshStandardMaterial
          color={ringColor}
          emissive={ringColor}
          emissiveIntensity={1}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
