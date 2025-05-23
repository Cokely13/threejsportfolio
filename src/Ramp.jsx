// components/Ramp.jsx
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Ramp({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}) {
  // load your Blender‑exported ramp
  const { scene } = useGLTF("/models/myRamp.glb");

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
