// import { useRef } from "react";
// import { RigidBody } from "@react-three/rapier";
// import { Sphere } from "@react-three/drei";
// import * as THREE from "three";

// export default function BouncyBall({
//   position,
//   color = "orange",
//   radius = 1.5,
// }) {
//   const ballRef = useRef();

//   return (
//     <RigidBody
//       ref={ballRef}
//       colliders="ball"
//       restitution={1.2} // high bounciness
//       friction={0.3}
//       mass={0.8} // Adjust for lighter/heavier reaction
//       position={position}
//     >
//       <Sphere args={[radius, 32, 32]} castShadow receiveShadow>
//         <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} />
//       </Sphere>
//     </RigidBody>
//   );
// }

import { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { Sphere } from "@react-three/drei";

export default function BouncyBall({
  position,
  color = "orange",
  radius = 1.5,
}) {
  const ballRef = useRef();

  // Adjust Y position by radius to prevent sinking
  const adjustedPosition = [position[0], position[1] + radius, position[2]];

  return (
    <RigidBody
      ref={ballRef}
      colliders="ball"
      restitution={1.2}
      friction={0.3}
      mass={0.8}
      position={adjustedPosition}
      ccd={true} // Helps prevent collisions from sinking in
    >
      <Sphere args={[radius, 32, 32]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} />
      </Sphere>
    </RigidBody>
  );
}
