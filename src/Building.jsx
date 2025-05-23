// // src/Building.jsx
// // src/Building.jsx
// import { useGLTF, Text, useTexture } from "@react-three/drei";
// import { RigidBody, CuboidCollider } from "@react-three/rapier";
// import { useFrame } from "@react-three/fiber";
// import { useRef, useState, useEffect } from "react";
// import * as THREE from "three";

// export default function Building({
//   position,
//   project,
//   rotation = [0, 0, 0],
//   playerRef,
//   onEnter,
//   showDebug = false,
// }) {
//   // 1) Load your four GLTF builds
//   const build1 = useGLTF("/models/build1.glb");
//   const build2 = useGLTF("/models/build2.glb");
//   const build3 = useGLTF("/models/build3.glb");
//   const build4 = useGLTF("/models/build4.glb");

//   // 2) Map each project to its scene + text settings
//   const modelMap = {
//     PopcornPair: {
//       scene: build1.scene,
//       textColor: "#000000",
//       textPosition: [0, 2.1, 2.51],
//       scale: 1,
//     },
//     HyroxTrack: {
//       scene: build2.scene,
//       textColor: "#000000",
//       textPosition: [0, 2.1, 2.51],
//       scale: 1,
//     },
//     NewHorizons: {
//       scene: build3.scene,
//       textColor: "#FFFFFF",
//       textPosition: [0, 2.1, 2.51],
//       scale: 1,
//     },
//     PlaylistBattle: {
//       scene: build4.scene,
//       textColor: "#FFFFFF",
//       textPosition: [0, 2.1, 2.51],
//       scale: 1,
//     },
//   };
//   const modelInfo = modelMap[project.name];
//   if (!modelInfo) return null;

//   // 3) Load all the PBR textures we need:
//   const [
//     defaultWallColor,
//     defaultWallNormal,
//     defaultWallRoughness,
//     defaultRoofColor,
//     defaultRoofNormal,
//     defaultRoofRoughness,
//     darkWallColor,
//     darkWallNormal,
//     darkWallRoughness,
//     greyRoofColor,
//     greyRoofNormal,
//     greyRoofRoughness,
//   ] = useTexture([
//     "/textures/Concrete-JPG/Concrete034_2K-JPG_Color.jpg",
//     "/textures/Concrete-JPG/Concrete034_2K-JPG_NormalDX.jpg",
//     "/textures/Concrete-JPG/Concrete034_2K-JPG_Roughness.jpg",
//     "/textures/darkRoofTilesJPG/RoofingTiles013A_2K-JPG_Color.jpg",
//     "/textures/darkRoofTilesJPG/RoofingTiles013A_2K-JPG_NormalDX.jpg",
//     "/textures/darkRoofTilesJPG/RoofingTiles013A_2K-JPG_Roughness.jpg",
//     "/textures/darkConcrete-JPG/Concrete031_2K-JPG_Color.jpg",
//     "/textures/darkConcrete-JPG/Concrete031_2K-JPG_NormalDX.jpg",
//     "/textures/darkConcrete-JPG/Concrete031_2K-JPG_Roughness.jpg",
//     "/textures/greyRoofTiles-JPG/RoofingTiles015A_2K-JPG_Color.jpg",
//     "/textures/greyRoofTiles-JPG/RoofingTiles015A_2K-JPG_NormalDX.jpg",
//     "/textures/greyRoofTiles-JPG/RoofingTiles015A_2K-JPG_Roughness.jpg",
//   ]);

//   // 4) Set all textures to tile & repeat
//   [
//     defaultWallColor,
//     defaultWallNormal,
//     defaultWallRoughness,
//     darkWallColor,
//     darkWallNormal,
//     darkWallRoughness,
//   ].forEach((tx) => {
//     tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
//     tx.repeat.set(4, 4);
//   });
//   [
//     defaultRoofColor,
//     defaultRoofNormal,
//     defaultRoofRoughness,
//     greyRoofColor,
//     greyRoofNormal,
//     greyRoofRoughness,
//   ].forEach((tx) => {
//     tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
//     tx.repeat.set(6, 6);
//   });

//   // 5) Build four materials
//   const defaultWallMat = new THREE.MeshStandardMaterial({
//     map: defaultWallColor,
//     normalMap: defaultWallNormal,
//     roughnessMap: defaultWallRoughness,
//     roughness: 1,
//     metalness: 0,
//   });
//   const defaultRoofMat = new THREE.MeshStandardMaterial({
//     map: defaultRoofColor,
//     normalMap: defaultRoofNormal,
//     roughnessMap: defaultRoofRoughness,
//     roughness: 1,
//     metalness: 0,
//   });
//   const darkWallMat = new THREE.MeshStandardMaterial({
//     map: darkWallColor,
//     normalMap: darkWallNormal,
//     roughnessMap: darkWallRoughness,
//     roughness: 1,
//     metalness: 0,
//   });
//   const greyRoofMat = new THREE.MeshStandardMaterial({
//     map: greyRoofColor,
//     normalMap: greyRoofNormal,
//     roughnessMap: greyRoofRoughness,
//     roughness: 1,
//     metalness: 0,
//   });

//   // 6) Traverse & assign materials based on project + mesh name
//   useEffect(() => {
//     modelInfo.scene.traverse((child) => {
//       if (!child.isMesh) return;
//       const lname = child.name.toLowerCase();
//       const isPopcorn = project.name === "PopcornPair";
//       const wallMat = isPopcorn ? darkWallMat : defaultWallMat;
//       const roofMat = isPopcorn ? greyRoofMat : defaultRoofMat;

//       if (lname.includes("roof")) {
//         child.material = roofMat;
//       } else if (lname.includes("text")) {
//         child.material = new THREE.MeshStandardMaterial({
//           color: new THREE.Color(modelInfo.textColor),
//           roughness: 0.2,
//           metalness: 0.1,
//         });
//       } else {
//         child.material = wallMat;
//       }
//       child.castShadow = child.receiveShadow = true;
//       child.material.needsUpdate = true;
//     });
//   }, [modelInfo, project.name]);

//   // 7) “enter” logic
//   const buildingRef = useRef();
//   const [entered, setEntered] = useState(false);
//   const [canTrigger, setCanTrigger] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setCanTrigger(true), 1000);
//     return () => clearTimeout(t);
//   }, []);

//   // 8) proximity check
//   useFrame(() => {
//     if (!playerRef?.current || !buildingRef.current || entered) return;
//     const p = playerRef.current.translation();
//     const b = buildingRef.current.translation();
//     if (!p || !b) return;
//     const d = Math.hypot(p.x - b.x, p.z - b.z);
//     if (d < 5) {
//       setEntered(true);
//       onEnter?.();
//     }
//   });

//   return (
//     <RigidBody type="fixed" colliders={false} ref={buildingRef}>
//       {/* 9) render your building */}
//       <primitive
//         object={modelInfo.scene}
//         position={position}
//         rotation={rotation}
//         scale={modelInfo.scale}
//         castShadow
//       />

//       {/* 3D label */}
//       <Text
//         position={[
//           position[0] + modelInfo.textPosition[0],
//           position[1] + modelInfo.textPosition[1],
//           position[2] + modelInfo.textPosition[2],
//         ]}
//         fontSize={0.3}
//         color={modelInfo.textColor}
//         anchorX="center"
//         anchorY="middle"
//       >
//         {project.name}
//       </Text>

//       {/* door “hole” */}
//       <mesh
//         position={[
//           rotation[1] === Math.PI ? position[0] - 1 : position[0] + 1,
//           position[1],
//           position[2],
//         ]}
//         rotation={[0, rotation[1], 0]}
//       >
//         <boxGeometry args={[5, 10, 3]} />
//         <meshBasicMaterial color="#000" transparent opacity={0.85} />
//       </mesh>

//       {/* invisible door sensor */}
//       <CuboidCollider
//         name={`door-${project.name}`}
//         args={[0.4, 1, 0.2]}
//         position={[
//           rotation[1] === Math.PI ? position[0] + 0.6 : position[0] - 0.6,
//           position[1] + 0.5,
//           rotation[1] === Math.PI ? position[2] - 2.5 : position[2] + 2.5,
//         ]}
//         sensor
//         onIntersectionEnter={({ other }) => {
//           if (canTrigger && other.rigidBodyObject?.name === "player") {
//             setEntered(true);
//             onEnter?.();
//           }
//         }}
//       />

//       {showDebug && (
//         <mesh
//           position={[
//             rotation[1] === Math.PI ? position[0] + 0.6 : position[0] - 0.6,
//             position[1] + 0.5,
//             rotation[1] === Math.PI ? position[2] - 2.5 : position[2] + 2.5,
//           ]}
//         >
//           <boxGeometry args={[0.4, 1, 0.2]} />
//           <meshStandardMaterial color="hotpink" transparent opacity={0.6} />
//         </mesh>
//       )}

//       {/* main building collider */}
//       <CuboidCollider
//         name={`building-${project.name}`}
//         args={[2.5, 2.5, 2.5]}
//         position={position}
//       />
//     </RigidBody>
//   );
// }

// src/Building.jsx
// src/Building.jsx
// src/Building.jsx
import React, { useEffect, useRef } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";

// choose which generic model goes with which project
const MODEL_MAP = {
  HyroxTrack: "build1.glb",
  PopcornPair: "build2.glb",
  NewHorizons: "build3.glb",
  PlaylistBattle: "build4.glb",
};

// simple color styles per project
const STYLE_MAP = {
  HyroxTrack: {
    baseColor: "#7f8c8d",
    roofColor: "#c0392b",
    trimColor: "#2c3e50",
    textColor: "#ecf0f1",
  },
  PopcornPair: {
    baseColor: "#e67e22",
    roofColor: "#d35400",
    trimColor: "#ecf0f1",
    textColor: "#ffffff",
  },
  NewHorizons: {
    baseColor: "#2ecc71",
    roofColor: "#27ae60",
    trimColor: "#f1c40f",
    textColor: "#000000",
  },
  PlaylistBattle: {
    baseColor: "#9b59b6",
    roofColor: "#8e44ad",
    trimColor: "#bdc3c7",
    textColor: "#000000",
  },
};

export default function Building({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  project,
  onEnter,
  showDebug = false,
}) {
  const modelFile = MODEL_MAP[project.name];
  const style = STYLE_MAP[project.name];
  if (!modelFile || !style) return null;

  // load the correct buildN.glb
  const { scene } = useGLTF(`/models/${modelFile}`);
  const ref = useRef();

  // apply flat materials
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
      {/* the building mesh */}
      <primitive object={scene} />

      {/* floating text label */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.4}
        color={style.textColor}
        anchorX="center"
        anchorY="middle"
      >
        {project.name}
      </Text>

      {/* invisible trigger */}
      <CuboidCollider
        sensor
        args={[2, 2, 2]}
        position={[0, 1, 0]}
        onIntersectionEnter={({ other }) => {
          if (other.rigidBodyObject?.name === "player") {
            onEnter?.();
          }
        }}
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

// preload all 4 generic builds
useGLTF.preload([
  "/models/build1.glb",
  "/models/build2.glb",
  "/models/build3.glb",
  "/models/build4.glb",
]);
