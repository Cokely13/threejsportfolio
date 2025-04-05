// import { Text } from "@react-three/drei";
// import { RigidBody } from "@react-three/rapier";

// const COLORS = {
//   JavaScript: "#f0db4f", // Yellow
//   PostgreSQL: "#336791", // Blue
//   Express: "#888888", // Gray
//   React: "#61dafb", // Cyan
//   Node: "#3c873a", // Green
//   CSS: "#264de4", // Blue
//   "Three.js": "#000000", // Black
// };

// export default function Skill({ label, position }) {
//   const color = COLORS[label] || "white";

//   return (
//     <RigidBody
//       type="dynamic"
//       colliders="ball"
//       mass={0.5}
//       restitution={0.7} // more bounce for fun
//       friction={0.5}
//       angularDamping={0.5}
//       linearDamping={0.3}
//       position={position}
//     >
//       {/* The Ball */}
//       <mesh>
//         <sphereGeometry args={[2, 32, 32]} />
//         <meshStandardMaterial color={color} wireframe={false} />
//       </mesh>

//       {/* Decorative Lines (visible rotation) */}
//       <mesh>
//         <sphereGeometry args={[2.05, 16, 16]} />
//         <meshStandardMaterial
//           color="white"
//           wireframe
//           opacity={0.2}
//           transparent
//         />
//       </mesh>

//       {/* Text Label floating ABOVE the ball */}
//       <Text
//         position={[0, 3, 0]} // Above the ball
//         fontSize={0.8}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//       >
//         {label}
//       </Text>
//     </RigidBody>
//   );
// }

// Skill.jsx
import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef, useEffect } from "react";

const COLORS = {
  JavaScript: "#f0db4f", // Yellow
  PostgreSQL: "#336791", // Blue
  Express: "#888888", // Gray
  React: "#61dafb", // Cyan
  Node: "#3c873a", // Green
  CSS: "#264de4", // Blue
  "Three.js": "#000000", // Black
};

export default function Skill({ label, position }) {
  const color = COLORS[label] || "white";
  const ballRef = useRef();

  return (
    <>
      <RigidBody
        ref={ballRef}
        type="dynamic"
        colliders="ball"
        mass={0.000001}
        restitution={0.8}
        friction={0.00001}
        angularDamping={0.1}
        linearDamping={0.05}
        position={position}
      >
        {/* The Ball */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* Decorative Lines */}
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

      {/* 🛑 TEXT OUTSIDE of RigidBody */}
      {/* Text that FOLLOWS the ball, but is not part of the physics */}
      <Text
        position={[position[0], position[1] + 2, position[2]]} // Centered initially
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0]}
      >
        {label}
      </Text>
    </>
  );
}
