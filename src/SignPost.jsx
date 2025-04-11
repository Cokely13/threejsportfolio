// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { Text } from "@react-three/drei";
// import { RigidBody } from "@react-three/rapier";

// // export default function SignPost({
// //   position = [0, 0, 0],
// //   text = "Sign",
// //   rotation = [0, 0, 0],
// // }) {
// //   const signRef = useRef();

// //   useFrame((state, delta) => {
// //     if (signRef.current) {
// //       signRef.current.rotation.y +=
// //         Math.sin(state.clock.elapsedTime * 0.5) * 0.0005; // slight idle sway 🌬️
// //     }
// //   });

// //   return (
// //     <group position={position} rotation={rotation} ref={signRef}>
// //       {/* Sign Post Pole */}
// //       <mesh position={[0, 1, 0]} castShadow>
// //         <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
// //         <meshStandardMaterial color="#8B4513" /> {/* brown wood */}
// //       </mesh>

// //       {/* Sign Board */}
// //       <mesh position={[0, 2, 0]} castShadow>
// //         <boxGeometry args={[2.5, 1.2, 0.1]} />
// //         <meshStandardMaterial color="#fdf6e3" /> {/* light cream */}
// //       </mesh>

// //       {/* Text on Sign */}
// //       <Text
// //         fontSize={0.5}
// //         color="black"
// //         anchorX="center"
// //         anchorY="middle"
// //         outlineWidth={0.02}
// //         outlineColor="white"
// //       >
// //         {text}
// //       </Text>
// //     </group>
// //   );
// // }

// export default function SignPost({
//   position = [0, 0, 0],
//   rotation = [0, 0, 0],
//   text = "Sign",
// }) {
//   return (
//     <RigidBody type="fixed" colliders="cuboid">
//       <group position={position} rotation={rotation}>
//         {/* Pole */}
//         <mesh position={[0, 1, 0]}>
//           <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
//           <meshStandardMaterial color="#8B4513" />
//         </mesh>

//         {/* Sign board */}
//         <mesh position={[0, 2.2, 0]}>
//           <boxGeometry args={[2.5, 1.2, 0.1]} />
//           <meshStandardMaterial color="#A0522D" /> {/* Slightly lighter wood */}
//         </mesh>

//         {/* Text */}
//         <Text
//           position={[0, 2.2, 0.06]} // Moved slightly forward so it doesn't clip
//           fontSize={0.6} // MUCH bigger
//           maxWidth={2}
//           anchorX="center"
//           anchorY="middle"
//           color="white"
//           outlineWidth={0.05}
//           outlineColor="black"
//           material-depthWrite={true} // ← ✨ THIS fixes see-through!
//           material-depthTest={true} // ← ✨ THIS too
//         >
//           {text}
//         </Text>
//       </group>
//     </RigidBody>
//   );
// }

import { RigidBody } from "@react-three/rapier";
import { Text } from "@react-three/drei";
import * as THREE from "three"; // <-- import THREE!!

export default function SignPost({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  text = "Sign",
}) {
  return (
    // <RigidBody type="fixed" colliders="cuboid">
    //   <group position={position} rotation={rotation}>
    //     {/* Pole */}
    //     <mesh position={[0, 1, 0]}>
    //       <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
    //       <meshStandardMaterial color="#8B4513" />
    //     </mesh>

    //     {/* Sign board */}
    //     <mesh position={[0, 2.2, 0]}>
    //       <boxGeometry args={[2.5, 1.2, 0.1]} />
    //       <meshStandardMaterial color="#A0522D" />
    //     </mesh>

    //     {/* Text */}
    //     <Text
    //       position={[0, 2.2, 0.06]}
    //       fontSize={0.6}
    //       maxWidth={2}
    //       anchorX="center"
    //       anchorY="middle"
    //       color="white"
    //       outlineWidth={0.05}
    //       outlineColor="black"
    //       material={new THREE.MeshStandardMaterial({ color: "white" })} // 👈 add this
    //       onSync={(textMesh) => {
    //         textMesh.material.depthWrite = true;
    //         textMesh.material.depthTest = true;
    //       }}
    //     >
    //       {text}
    //     </Text>
    //   </group>
    // </RigidBody>
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Pole */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Sign board */}
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[2.5, 1.2, 0.1]} />
          <meshStandardMaterial color="#A0522D" />
        </mesh>
      </RigidBody>

      {/* Text */}
      <Text
        position={[0, 2.2, 0.06]}
        fontSize={0.6}
        maxWidth={2}
        anchorX="center"
        anchorY="middle"
        color="white"
        outlineWidth={0.05}
        outlineColor="black"
        material-toneMapped={false}
      >
        {text}
      </Text>
    </group>
  );
}
