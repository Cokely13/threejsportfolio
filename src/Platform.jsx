// components/Platform.jsx
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Platform({
  src = "/models/rampPlat.glb", // your combined Blender GLB
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  friction = 1,
  restitution = 0,
}) {
  const { scene } = useGLTF(src);

  return (
    <RigidBody
      type="fixed"
      colliders="trimesh" // precise triangle‐mesh collider
      friction={friction}
      restitution={restitution}
      position={position}
      rotation={rotation}
    >
      <primitive object={scene} scale={scale} castShadow receiveShadow />
    </RigidBody>
  );
}
