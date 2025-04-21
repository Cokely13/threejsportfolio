import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function MyHill({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}) {
  //   const { nodes } = useGLTF("/models/myhill.glb");

  //   return (
  //     <RigidBody type="fixed" colliders="trimesh">
  //       <mesh
  //         geometry={nodes.Plane.geometry}
  //         // object={scene}
  //         position={position}
  //         scale={scale}
  //         rotation={rotation}
  //       >
  //         <meshStandardMaterial color="green" />
  //       </mesh>
  //     </RigidBody>
  //   );
  // }
  const { scene } = useGLTF("/models/newestRamp.glb");

  return (
    <RigidBody
      type="fixed"
      colliders="trimesh" // ← use a precise triangle‐mesh collider
      friction={1}
      restitution={0}
      position={position}
      rotation={rotation}
    >
      {/* “scene” is your entire GLTF, with its own geometry+materials */}
      <primitive object={scene} scale={scale} castShadow receiveShadow />
    </RigidBody>
  );
}
