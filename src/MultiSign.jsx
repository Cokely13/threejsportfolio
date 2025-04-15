// import { Text } from "@react-three/drei";
// import { RigidBody } from "@react-three/rapier";

// export default function MultiSignPost({ position = [0, 0, 0] }) {
//   return (
//     <group position={position}>
//       <RigidBody type="fixed" colliders="cuboid">
//         {/* Main Pole */}
//         <mesh position={[0, 2, 0]}>
//           <cylinderGeometry args={[0.1, 0.1, 4, 16]} />
//           <meshStandardMaterial color="#8B4513" />
//         </mesh>
//       </RigidBody>

//       {/* Signs */}
//       <Sign
//         label="Skills →"
//         position={[0.8, 3, 0]}
//         rotation={[0, Math.PI / 2, 0]}
//       />
//       <Sign
//         label="Projects →"
//         position={[0.8, 2.5, 0]}
//         rotation={[0, Math.PI / 2, 0]}
//       />
//       <Sign
//         label="← About"
//         position={[-0.8, 2.5, 0]}
//         rotation={[0, -Math.PI / 2, 0]}
//       />
//       <Sign
//         label="↓ Contact"
//         position={[0, 2, 0.8]}
//         rotation={[Math.PI / 2, 0, 0]}
//       />
//     </group>
//   );
// }

// function Sign({ label, position, rotation }) {
//   return (
//     <group position={position} rotation={rotation}>
//       <mesh>
//         <boxGeometry args={[1.8, 0.5, 0.1]} />
//         <meshStandardMaterial color="#A0522D" />
//       </mesh>
//       <Text
//         fontSize={0.25}
//         position={[0, 0, 0.06]}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//         outlineWidth={0.03}
//         outlineColor="black"
//       >
//         {label}
//       </Text>
//     </group>
//   );
// }

import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function MultiSignPost({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Main Pole */}
        <mesh position={[0, 3.5, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 10, 18]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </RigidBody>

      {/* SIGNS */}
      <BigSign
        label="<-  Skills "
        position={[-1.2, 5, -1.3]}
        rotation={[0, 5.4, 0]}
      />
      <BigSign
        label="<- Projects "
        position={[0, 7, -1.8]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <BigSign
        label="About ->"
        position={[1.3, 6, -1.3]}
        rotation={[0, 0.8, 0]}
      />
      <BigSign
        label="Contact ->"
        position={[0.5, 8, -1.6]}
        rotation={[0, 1.3, 0]}
      />
    </group>
  );
}

function BigSign({ label, position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Big Wood Board */}
      <mesh>
        <boxGeometry args={[3.5, 1, 0.2]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>

      {/* Real Text */}
      <Text
        fontSize={0.5}
        position={[0, 0, 0.15]}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="black"
      >
        {label}
      </Text>

      {/* Optional: Add a simple arrow shape here later */}
    </group>
  );
}
