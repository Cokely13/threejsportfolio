// import { Text } from "@react-three/drei";
// import { RigidBody } from "@react-three/rapier";
// import { useRef, useState } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// // 🎨 Ball base colors
// const COLORS = {
//   JavaScript: "#f0db4f", // Yellow
//   PostgreSQL: "#336791", // Blue
//   Express: "#888888", // Gray
//   React: "#61dafb", // Cyan
//   Node: "#3c873a", // Green
//   CSS: "#264de4", // Blue
//   "Three.js": "#000000", // Black
// };

// // 🎨 Text colors that look good on the ball
// const TEXT_COLORS = {
//   JavaScript: "#000000", // Black text on Yellow
//   PostgreSQL: "#ffffff", // White text on Blue
//   Express: "#ffffff", // White text on Gray
//   React: "#000000", // Black text on Cyan
//   Node: "#ffffff", // White text on Green
//   CSS: "#ffffff", // White text on Blue
//   "Three.js": "#ffffff", // White text on Black
// };

// // 🖌️ Create a texture with text for each ball
// function createTextTexture(text, textColor = "white") {
//   const canvas = document.createElement("canvas");
//   const context = canvas.getContext("2d");

//   canvas.width = 512;
//   canvas.height = 512;

//   // Transparent background
//   context.clearRect(0, 0, canvas.width, canvas.height);

//   // Draw text
//   context.font = "bold 80px Arial";
//   context.fillStyle = textColor;
//   context.textAlign = "center";
//   context.textBaseline = "middle";
//   context.fillText(text, canvas.width / 2, canvas.height / 2);

//   const texture = new THREE.CanvasTexture(canvas);
//   texture.needsUpdate = true;
//   return texture;
// }

// export default function Skill({ label, position, playerRef }) {
//   const color = COLORS[label] || "white"; // Ball color
//   const textColor = TEXT_COLORS[label] || "white"; // Matching text color
//   const ballRef = useRef();
//   const [activated, setActivated] = useState(false);
//   const [initialY] = useState(position[1]);
//   const [floatOffset] = useState(() => Math.random() * Math.PI * 2);

//   const textTexture = createTextTexture(label, textColor);

//   useFrame((state) => {
//     if (ballRef.current) {
//       if (!activated) {
//         // Floating animation
//         const t = state.clock.getElapsedTime();
//         const floatY = initialY + Math.sin(t * 2 + floatOffset) * 0.5;

//         ballRef.current.setNextKinematicTranslation({
//           x: position[0],
//           y: floatY,
//           z: position[2],
//         });

//         ballRef.current.setNextKinematicRotation({
//           x: 0,
//           y: Math.sin(t + floatOffset) * 0.2,
//           z: 0,
//           w: 1,
//         });

//         // Check distance to activate
//         if (playerRef?.current) {
//           const ballPosition = ballRef.current.translation();
//           const playerPosition = playerRef.current.translation();

//           const distance = Math.sqrt(
//             (ballPosition.x - playerPosition.x) ** 2 +
//               (ballPosition.y - playerPosition.y) ** 2 +
//               (ballPosition.z - playerPosition.z) ** 2
//           );

//           if (distance < 15) {
//             setActivated(true);
//             ballRef.current.setBodyType("dynamic");
//           }
//         }
//       }
//     }
//   });

//   return (
//     <>
//       <RigidBody
//         ref={ballRef}
//         type="kinematicPosition"
//         colliders="ball"
//         mass={0.2}
//         restitution={0.8}
//         friction={0.3}
//         angularDamping={0.1}
//         linearDamping={0.1}
//         position={position}
//       >
//         {/* Ball */}
//         <mesh castShadow receiveShadow>
//           <sphereGeometry args={[2, 32, 32]} />
//           <meshStandardMaterial map={textTexture} color={color} />
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

//       {/* Floating Label (optional) */}
//       {/* <Text
//         position={[position[0], position[1] + 2, position[2]]}
//         fontSize={0.8}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//       >
//         {label}
//       </Text> */}
//     </>
//   );
// }

import { RigidBody } from "@react-three/rapier";
import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 🎨 Ball base colors
const COLORS = {
  JavaScript: "#f0db4f", // Yellow
  PostgreSQL: "#336791", // Blue
  Express: "#888888", // Gray
  React: "#61dafb", // Light Cyan
  Node: "#3c873a", // Green
  CSS: "#264de4", // Bright Blue
  "Three.js": "#000000", // Black
};

// 🎨 Text colors (complementary)
const TEXT_COLORS = {
  JavaScript: "#000000", // Black on yellow
  PostgreSQL: "#ffffff", // White on blue
  Express: "#ffffff", // White on gray
  React: "#000000", // Black on cyan
  Node: "#ffffff", // White on green
  CSS: "#ffffff", // White on blue
  "Three.js": "#ffffff", // White on black
};

// 🖌️ Create a text-painted texture
function createTextTexture(text, ballColor = "white", textColor = "white") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 512;

  // 🎨 Fill background first
  context.fillStyle = ballColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // 🎨 Draw text on top
  context.font = "bold 80px Arial";
  context.fillStyle = textColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function Skill({ label, position, playerRef }) {
  const ballRef = useRef();
  const [activated, setActivated] = useState(false);
  const [initialY] = useState(position[1]);
  const [floatOffset] = useState(() => Math.random() * Math.PI * 2);

  const ballColor = COLORS[label] || "white";
  const textColor = TEXT_COLORS[label] || "white";

  // Generate texture ONCE
  const textTexture = useMemo(() => {
    const safeLabel = label || "Skill";
    const ballColor = COLORS[safeLabel] || "white";
    const textColor = TEXT_COLORS[safeLabel] || "white";
    return createTextTexture(safeLabel, ballColor, textColor);
  }, [label]);

  useFrame((state) => {
    if (ballRef.current) {
      if (!activated) {
        // Floating animation
        const t = state.clock.getElapsedTime();
        const floatY = initialY + Math.sin(t * 2 + floatOffset) * 0.5;

        ballRef.current.setNextKinematicTranslation({
          x: position[0],
          y: floatY,
          z: position[2],
        });

        ballRef.current.setNextKinematicRotation({
          x: 0,
          y: Math.sin(t + floatOffset) * 0.2,
          z: 0,
          w: 1,
        });

        // Check if player is close
        if (playerRef?.current) {
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
    }
  });

  return (
    <>
      <RigidBody
        ref={ballRef}
        type={activated ? "dynamic" : "kinematicPosition"}
        colliders="ball"
        mass={1} // ⚡ Make them heavier
        restitution={0.8} // ⚡ Bouncy
        friction={0.1} // ⚡ Low friction to roll
        angularDamping={0.1}
        linearDamping={0.1}
        position={position}
      >
        {/* Ball with text texture */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial
            map={textTexture}
            toneMapped={false}
            transparent={false}
          />
        </mesh>

        {/* Softer wireframe */}
        <mesh>
          <sphereGeometry args={[2.05, 16, 16]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe
            opacity={0.08} // Softer wireframe
            transparent
          />
        </mesh>
      </RigidBody>
    </>
  );
}
