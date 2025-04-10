// import { useGLTF } from "@react-three/drei";
// import { RigidBody } from "@react-three/rapier";

// export default function MyHill({
//   position = [0, 0, 0],
//   scale = [1, 1, 1],
//   rotation = [0, 0, 0],
// }) {
//   const { scene } = useGLTF("/models/myhill.glb");

//   return (
//     <RigidBody type="fixed" colliders="trimesh">
//       <primitive
//         object={scene}
//         position={position}
//         scale={scale}
//         rotation={rotation}
//       />
//     </RigidBody>
//   );
// }

import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function MyHill({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}) {
  const { nodes } = useGLTF("/models/myhill.glb");

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <mesh
        geometry={nodes.Plane.geometry}
        // object={scene}
        position={position}
        scale={scale}
        rotation={rotation}
      >
        <meshStandardMaterial color="green" />
      </mesh>
    </RigidBody>
  );
}
