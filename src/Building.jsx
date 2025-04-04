// Building.jsx
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// function Building({ position, color, project }) {
//   const buildingRef = useRef();

//   // Optional: Animate or interact buildings
//   useFrame(() => {
//     // Interaction or animations if desired
//   });

//   return (
//     <mesh ref={buildingRef} position={position}>
//       <boxGeometry args={[4, 5, 4]} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// }

// export default Building;

import { RigidBody, CuboidCollider } from "@react-three/rapier";

function Building({ position, color, project }) {
  return (
    // <RigidBody type="fixed" colliders={false}>
    //   <mesh name={`building-${project}`} position={position} castShadow>
    //     <boxGeometry args={[5, 5, 5]} />
    //     <meshStandardMaterial color={color} />
    //   </mesh>
    //   <CuboidCollider args={[2.5, 2.5, 2.5]} position={position} />
    // </RigidBody>
    <RigidBody type="fixed" colliders={false}>
      <mesh position={position} castShadow>
        <boxGeometry args={[5, 5, 5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <CuboidCollider
        name={`building-${project}`}
        args={[2.5, 2.5, 2.5]}
        position={position}
      />
    </RigidBody>
  );
}

export default Building;
