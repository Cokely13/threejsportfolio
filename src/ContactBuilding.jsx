// import { RigidBody } from "@react-three/rapier";
// import { Text, useGLTF } from "@react-three/drei";
// import { useFrame, useLoader } from "@react-three/fiber";
// import { useRef, useState, useEffect, useMemo } from "react";
// import { TextureLoader } from "three";

// export default function ContactBuilding({
//   position = [0, 0, -90],
//   playerRef,
//   onEnter,
//   popupVisible,
// }) {
//   const buildingRef = useRef();
//   const [entered, setEntered] = useState(false);

//   const { scene } = useGLTF("/models/firstBuild.glb");
//   const blueMetalTexture = useLoader(TextureLoader, "/textures/roof.jpg");

//   const texturedScene = useMemo(() => {
//     const clone = scene.clone();
//     clone.traverse((child) => {
//       if (child.isMesh) {
//         child.material.map = blueMetalTexture;
//         child.material.needsUpdate = true;
//       }
//     });
//     return clone;
//   }, [scene, blueMetalTexture]);

//   useFrame(() => {
//     if (!playerRef?.current || entered) return;

//     const playerPosition = playerRef.current.translation();
//     if (!playerPosition) return;

//     const dx = playerPosition.x - position[0];
//     const dz = playerPosition.z - position[2];
//     const distance = Math.sqrt(dx * dx + dz * dz);

//     if (distance < 8) {
//       setEntered(true);
//       onEnter();
//     }
//   });

//   useEffect(() => {
//     if (!popupVisible) {
//       setEntered(false);
//     }
//   }, [popupVisible]);

//   return (
//     <RigidBody type="fixed" colliders="cuboid" ref={buildingRef}>
//       <primitive
//         object={texturedScene}
//         position={position}
//         scale={[2, 1.5, 2]}
//         rotation={[0, -Math.PI / 2, 0]}
//       />
//     </RigidBody>
//   );
// }

// ContactBuilding.jsx
import { RigidBody } from "@react-three/rapier";
import { Text, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import { TextureLoader } from "three";

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
    </RigidBody>
  );
}
