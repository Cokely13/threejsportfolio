// ContactBuilding.jsx
import { RigidBody } from "@react-three/rapier";
import { Text, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import { TextureLoader } from "three";
import DoorFrame from "./DoorFrame";
import Window from "./Window";
import Lantern from "./Lantern";
import Marquee from "./Marquee";

export default function ContactBuilding({
  position = [0, 0, -90],
  playerRef,
  onEnter, // should set popupVisible = true
  popupVisible, // not used here for logic anymore
}) {
  const buildingRef = useRef();
  const [entered, setEntered] = useState(false);
  const radius = 8;

  // load & texture the GLTF as before…
  const { scene } = useGLTF("/models/firstBuild.glb");
  const blueMetalTexture = useLoader(TextureLoader, "/textures/roof.jpg");
  const texturedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material.map = blueMetalTexture;
        child.material.needsUpdate = true;
      }
    });
    return clone;
  }, [scene, blueMetalTexture]);

  useFrame(() => {
    if (!playerRef.current) return;
    const { x, z } = playerRef.current.translation();
    const dx = x - position[0];
    const dz = z - position[2];
    const distance = Math.hypot(dx, dz);

    if (distance < radius) {
      // crossed into the zone
      if (!entered) {
        setEntered(true);
        onEnter();
      }
    } else {
      // left the zone
      if (entered) {
        setEntered(false);
      }
    }
  });

  return (
    <RigidBody type="fixed" colliders="cuboid" ref={buildingRef}>
      <primitive
        object={texturedScene}
        position={position}
        scale={[2, 1.5, 2]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <DoorFrame
        position={[1, 9, -81.5]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      />

      {/* — Two windows (left & right) — */}
      <Window
        position={[-5, 15, -81.5]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 0.1]}
      />
      <Window
        position={[5, 15, -81.5]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      />

      {/* — Marquee above the door — */}
      <Marquee
        position={[0.8, 15, -81.5]}
        rotation={[0, 0, 0]}
        scale={[1.5, 0.3, 0.1]}
      />

      {/* — Lanterns flanking the door — */}
      <Lantern position={[4, 13, -81.5]} rotation={[0, 0, 0]} />
      <Lantern position={[-2, 13, -81.5]} rotation={[0, 0, 0]} />
    </RigidBody>
  );
}
