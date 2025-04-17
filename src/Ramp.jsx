// // components/Ramp.jsx
// import { RigidBody, CuboidCollider } from "@react-three/rapier";

// export default function Ramp({
//   position = [0, 0, 0],
//   rotation = [0, 0, 0],
//   width = 4,
//   height = 4,
//   depth = 8,

//   color = "#DAA520",
// }) {
//   const angle = Math.atan(height / depth); // Ramp slope in radians

//   return (
//     <group position={position} rotation={rotation}>
//       {/* Visual ramp */}
//       <mesh
//         position={[
//           position[0],
//           position[1] + height / 2,
//           position[2] - depth / 2,
//         ]}
//         rotation={[-angle, 0, 0]}
//       >
//         <boxGeometry args={[width, height, depth]} />
//         <meshStandardMaterial color={color} />
//       </mesh>

//       {/* Actual slope collider */}
//       <RigidBody type="fixed">
//         <group
//           position={[
//             position[0],
//             position[1] + height / 2,
//             position[2] - depth / 2,
//           ]}
//           rotation={[0, 0, 0]}
//         >
//           <CuboidCollider args={[width / 2, height / 2, depth / 2]} />
//         </group>
//       </RigidBody>
//     </group>
//   );
// }

import { RigidBody, CuboidCollider } from "@react-three/rapier";

export default function Ramp({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 4,
  height = 4,
  depth = 8,
  color = "#DAA520",
}) {
  const angle = Math.atan(height / depth); // Ramp slope in radians

  return (
    <group position={position} rotation={rotation}>
      {/* Visual ramp mesh */}
      <mesh position={[0, height / 2, -depth / 2]} rotation={[-angle, 0, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Slope collider (aligned with mesh) */}
      <RigidBody type="fixed" colliders={false}>
        <group position={[0, height / 2, -depth / 2]} rotation={[0, 0, 0]}>
          <CuboidCollider args={[width / 2, height / 2, depth / 2]} />
        </group>
      </RigidBody>
    </group>
  );
}
