// // import { Text } from "@react-three/drei";
// // import { RigidBody } from "@react-three/rapier";
// // import { useRef, useEffect, useState } from "react";
// // import { useFrame } from "@react-three/fiber";

// // const COLORS = {
// //   JavaScript: "#f0db4f",
// //   PostgreSQL: "#336791",
// //   Express: "#888888",
// //   React: "#61dafb",
// //   Node: "#3c873a",
// //   CSS: "#264de4",
// //   "Three.js": "#000000",
// // };

// // export default function Skill({ label, position, playerRef }) {
// //   const color = COLORS[label] || "white";
// //   const ballRef = useRef();
// //   const [activated, setActivated] = useState(false);

// //   useFrame(() => {
// //     if (!activated && playerRef?.current && ballRef.current) {
// //       const ballPosition = ballRef.current.translation();
// //       const playerPosition = playerRef.current.translation();

// //       const distance = Math.sqrt(
// //         (ballPosition.x - playerPosition.x) ** 2 +
// //           (ballPosition.y - playerPosition.y) ** 2 +
// //           (ballPosition.z - playerPosition.z) ** 2
// //       );

// //       if (distance < 15) {
// //         // 🛑 Distance threshold to activate
// //         setActivated(true);
// //         ballRef.current.setBodyType("dynamic");
// //       }
// //     }
// //   });

// //   return (
// //     <>
// //       <RigidBody
// //         ref={ballRef}
// //         type="kinematicPosition" // 🛑 Start kinematic!
// //         colliders="ball"
// //         mass={0.5}
// //         restitution={0.3}
// //         friction={0.8}
// //         angularDamping={0.5}
// //         linearDamping={0.3}
// //         position={position}
// //       >
// //         {/* Ball */}
// //         <mesh castShadow receiveShadow>
// //           <sphereGeometry args={[2, 32, 32]} />
// //           <meshStandardMaterial color={color} />
// //         </mesh>

// //         {/* Decorative Wireframe */}
// //         <mesh>
// //           <sphereGeometry args={[2.05, 16, 16]} />
// //           <meshStandardMaterial
// //             color="white"
// //             wireframe
// //             opacity={0.2}
// //             transparent
// //           />
// //         </mesh>
// //       </RigidBody>

// //       {/* Label */}
// //       <Text
// //         position={[position[0], position[1] + 2, position[2]]}
// //         fontSize={0.8}
// //         color="white"
// //         anchorX="center"
// //         anchorY="middle"
// //       >
// //         {label}
// //       </Text>
// //     </>
// //   );
// // }

// import { Text } from "@react-three/drei";
// import { RigidBody } from "@react-three/rapier";
// import { useRef, useEffect, useState } from "react";
// import { useFrame } from "@react-three/fiber";

// const COLORS = {
//   JavaScript: "#f0db4f",
//   PostgreSQL: "#336791",
//   Express: "#888888",
//   React: "#61dafb",
//   Node: "#3c873a",
//   CSS: "#264de4",
//   "Three.js": "#000000",
// };

// export default function Skill({ label, position, playerRef }) {
//   const color = COLORS[label] || "white";
//   const ballRef = useRef();
//   const [activated, setActivated] = useState(false);
//   const [initialY, setInitialY] = useState(position[1]);

//   useFrame((state) => {
//     if (ballRef.current) {
//       if (!activated) {
//         // 🛑 Float up and down gently before activation
//         const t = state.clock.getElapsedTime();
//         const floatY = initialY + Math.sin(t * 2) * 0.5; // speed * height
//         ballRef.current.setNextKinematicTranslation({
//           x: position[0],
//           y: floatY,
//           z: position[2],
//         });
//       } else if (playerRef?.current) {
//         // 🛑 Check distance to player
//         const ballPosition = ballRef.current.translation();
//         const playerPosition = playerRef.current.translation();

//         const distance = Math.sqrt(
//           (ballPosition.x - playerPosition.x) ** 2 +
//             (ballPosition.y - playerPosition.y) ** 2 +
//             (ballPosition.z - playerPosition.z) ** 2
//         );

//         if (distance < 15) {
//           setActivated(true);
//           ballRef.current.setBodyType("dynamic");
//         }
//       }
//     }
//   });

//   return (
//     <>
//       <RigidBody
//         ref={ballRef}
//         type="kinematicPosition" // 🛑 Start as kinematic!
//         colliders="ball"
//         mass={0.5}
//         restitution={0.3}
//         friction={0.8}
//         angularDamping={0.5}
//         linearDamping={0.3}
//         position={position}
//       >
//         {/* Ball */}
//         <mesh castShadow receiveShadow>
//           <sphereGeometry args={[2, 32, 32]} />
//           <meshStandardMaterial color={color} />
//         </mesh>

//         {/* Decorative Wireframe */}
//         <mesh>
//           <sphereGeometry args={[2.05, 16, 16]} />
//           <meshStandardMaterial
//             color="white"
//             wireframe
//             opacity={0.2}
//             transparent
//           />
//         </mesh>
//       </RigidBody>

//       {/* Label */}
//       <Text
//         position={[position[0], position[1] + 2, position[2]]}
//         fontSize={0.8}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//       >
//         {label}
//       </Text>
//     </>
//   );
// }

import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const COLORS = {
  JavaScript: "#f0db4f",
  PostgreSQL: "#336791",
  Express: "#888888",
  React: "#61dafb",
  Node: "#3c873a",
  CSS: "#264de4",
  "Three.js": "#000000",
};

export default function Skill({ label, position, playerRef }) {
  const color = COLORS[label] || "white";
  const ballRef = useRef();
  const [activated, setActivated] = useState(false);
  const [initialY] = useState(position[1]);
  const [floatOffset] = useState(() => Math.random() * Math.PI * 2); // 🛑 random offset so they float at different phases

  useFrame((state) => {
    if (ballRef.current) {
      if (!activated) {
        // 🛑 Float and rotate while waiting
        const t = state.clock.getElapsedTime();
        const floatY = initialY + Math.sin(t * 2 + floatOffset) * 0.5; // add offset so they bob differently

        ballRef.current.setNextKinematicTranslation({
          x: position[0],
          y: floatY,
          z: position[2],
        });

        ballRef.current.setNextKinematicRotation({
          x: 0,
          y: Math.sin(t + floatOffset) * 0.2, // gentle rotate left/right
          z: 0,
          w: 1,
        });
      } else if (playerRef?.current) {
        // 🛑 Activate if player is close
        const ballPosition = ballRef.current.translation();
        const playerPosition = playerRef.current.translation();

        const distance = Math.sqrt(
          (ballPosition.x - playerPosition.x) ** 2 +
            (ballPosition.y - playerPosition.y) ** 2 +
            (ballPosition.z - playerPosition.z) ** 2
        );

        if (distance < 15) {
          setActivated(true);
          ballRef.current.setBodyType("dynamic");
        }
      }
    }
  });

  return (
    <>
      <RigidBody
        ref={ballRef}
        type="kinematicPosition"
        colliders="ball"
        mass={0.5}
        restitution={0.3}
        friction={0.8}
        angularDamping={0.5}
        linearDamping={0.3}
        position={position}
      >
        {/* Ball */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* Decorative Wireframe */}
        <mesh>
          <sphereGeometry args={[2.05, 16, 16]} />
          <meshStandardMaterial
            color="white"
            wireframe
            opacity={0.2}
            transparent
          />
        </mesh>
      </RigidBody>

      {/* Label */}
      <Text
        position={[position[0], position[1] + 2, position[2]]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </>
  );
}
