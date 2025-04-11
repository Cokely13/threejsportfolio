// // ResetButton.jsx
// import { RigidBody } from "@react-three/rapier";

// export default function ResetButton({ onReset, position = [0, 0, 0] }) {
//   return (
//     <RigidBody
//       type="fixed"
//       sensor // 🛑 Sensor means no physical collision, just detects
//       colliders="cuboid"
//       position={position}
//       onCollisionEnter={() => {
//         if (onReset) onReset(); // 🛑 Call the reset function when player steps on it
//       }}
//     >
//       {/* Visible Button (you can make this prettier later) */}
//       <mesh>
//         <boxGeometry args={[2, 0.5, 2]} />
//         <meshStandardMaterial color="orange" />
//       </mesh>
//     </RigidBody>
//   );
// }

// import { RigidBody } from "@react-three/rapier";

// export default function ResetButton({ onReset, position = [0, 0, 0] }) {
//   return (
//     <RigidBody
//       type="fixed"
//       sensor
//       colliders="cuboid"
//       position={position}
//       onCollisionEnter={(payload) => {
//         const collider = payload.other?.colliderObject;
//         if (collider?.name === "player" && onReset) {
//           onReset(); // 🛑 NOW it will reset
//         }
//       }}
//     >
//       <mesh>
//         <boxGeometry args={[2, 0.5, 2]} />
//         <meshStandardMaterial color="orange" />
//       </mesh>
//     </RigidBody>
//   );
// }

import { RigidBody } from "@react-three/rapier";

export default function ResetButton({ onReset, position = [0, 0, 0] }) {
  return (
    // <RigidBody
    //   type="fixed"
    //   sensor
    //   colliders="cuboid"
    //   position={position}
    //   onCollisionEnter={(payload) => {
    //     console.log("🚨 Collision detected with ResetButton!");

    //     const otherCollider = payload.other; // 🛑 Correct field here!
    //     console.log("🎯 Collider object:", otherCollider);

    //     if (!otherCollider) {
    //       console.warn("❌ No collider found.");
    //       return;
    //     }

    //     const colliderName = otherCollider?.name;
    //     console.log("🎯 Collider name:", colliderName);

    //     if (colliderName === "player" && onReset) {
    //       console.log("✅ Player touched the reset button.");
    //       onReset();
    //     } else {
    //       console.warn("❌ Collider is not the player.");
    //     }
    //   }}
    // >
    //   <mesh>
    //     <boxGeometry args={[2, 0.5, 2]} />
    //     <meshStandardMaterial color="orange" />
    //   </mesh>
    // </RigidBody>
    <RigidBody
      type="fixed"
      sensor
      name="resetButton" // 🛑 ✅ VERY IMPORTANT
      colliders="cuboid"
      position={position}
      onCollisionEnter={(payload) => {
        console.log("🚨 Collision detected with ResetButton!", payload);
      }}
    >
      <mesh>
        <boxGeometry args={[2, 0.5, 2]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </RigidBody>
  );
}
