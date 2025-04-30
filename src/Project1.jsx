// // Project1.jsx
// import React, { useEffect, useRef } from "react";
// import { useGLTF, Text } from "@react-three/drei";
// import { RigidBody, CuboidCollider } from "@react-three/rapier";
// import * as THREE from "three";

// export default function Project1({
//   position = [0, 0, 0],
//   rotation = [0, 0, 0],
//   scale = [1, 1, 1],
//   onEnter,
//   showDebug = false,
// }) {
//   const ref = useRef();
//   const { scene } = useGLTF("/models/build2.glb");
//   const style = {
//     baseColor: "#7f8c8d",
//     roofColor: "#c0392b",
//     trimColor: "#2c3e50",
//     textColor: "#ecf0f1",
//   };

//   useEffect(() => {
//     scene.traverse((child) => {
//       if (!child.isMesh) return;
//       console.log("Mesh name:", child.name);
//       const lname = child.name.toLowerCase();
//       let color = style.baseColor;
//       if (lname.includes("roof")) color = style.roofColor;
//       else if (lname.includes("trim") || lname.includes("frame"))
//         color = style.trimColor;

//       child.material = new THREE.MeshStandardMaterial({
//         color,
//         roughness: 0.7,
//         metalness: 0.1,
//       });
//       child.castShadow = child.receiveShadow = true;
//       child.material.needsUpdate = true;
//     });
//   }, [scene, style]);

//   return (
//     <RigidBody
//       ref={ref}
//       type="fixed"
//       colliders={false}
//       position={position}
//       rotation={rotation}
//       scale={scale}
//     >
//       <primitive object={scene} />
//       {/* <Text
//         position={[0, 2.5, 0]}
//         fontSize={0.4}
//         color={style.textColor}
//         anchorX="center"
//         anchorY="middle"
//       >
//         HyroxTrack
//       </Text> */}
//       <CuboidCollider
//         sensor
//         args={[4, 4, 4]}
//         position={[0, 1, 0]}
//         onIntersectionEnter={({ other }) =>
//           other.rigidBodyObject?.name === "player" && onEnter?.()
//         }
//       />
//       {showDebug && (
//         <mesh>
//           <boxGeometry args={[4, 4, 4]} />
//           <meshBasicMaterial color="hotpink" wireframe />
//         </mesh>
//       )}
//     </RigidBody>
//   );
// }

// Project1.jsx
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";

export default function Project1({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  onEnter,
  showDebug = false,
}) {
  const ref = useRef();
  const { scene } = useGLTF("/models/build2.glb");
  const style = {
    baseColor: "#7f8c8d",
    roofColor: "grey",
    trimColor: "#2c3e50",
    textColor: "#ecf0f1",
  };

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return;
      let color;
      switch (child.name) {
        case "Cube":
          color = style.baseColor;
          break;
        case "Cube002":
          color = style.trimColor;
          break;
        case "Plane":
        case "Plane001":
          color = style.roofColor;
          break;
        case "Text001":
          color = style.textColor;
          break;
        default:
          color = style.baseColor;
      }

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
      <CuboidCollider
        sensor
        args={[4, 4, 4]}
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
