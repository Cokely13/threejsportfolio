// import { RigidBody, CuboidCollider } from "@react-three/rapier";

// function Building({ position, color, project }) {
//   return (
//     <RigidBody type="fixed" colliders={false}>
//       <mesh name={`building-${project.name}`} position={position} castShadow>
//         <boxGeometry args={[5, 5, 5]} />
//         <meshStandardMaterial color={color} />
//       </mesh>
//       <CuboidCollider args={[2.5, 2.5, 2.5]} position={position} />
//     </RigidBody>
//     // <RigidBody type="fixed" colliders={false}>
//     //   <mesh position={position} castShadow>
//     //     <boxGeometry args={[5, 5, 5]} />
//     //     <meshStandardMaterial color={color} />
//     //   </mesh>
//     //   <CuboidCollider
//     //     name={`building-${project}`}
//     //     args={[2.5, 2.5, 2.5]}
//     //     position={position}
//     //   />
//     // </RigidBody>
//   );
// }

// export default Building;

import { RigidBody, CuboidCollider } from "@react-three/rapier";

function Building({ position, color, project }) {
  return (
    <RigidBody type="fixed" colliders={false}>
      <mesh position={position} castShadow>
        <boxGeometry args={[5, 5, 5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <CuboidCollider
        name={`building-${project.name}`} // 🛠️ Set the name on the collider!
        args={[2.5, 2.5, 2.5]}
        position={position}
      />
    </RigidBody>
  );
}

export default Building;
