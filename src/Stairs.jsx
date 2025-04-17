// components/BlenderStairs.jsx
import { useGLTF } from "@react-three/drei";
import { RigidBody, MeshCollider } from "@react-three/rapier";

export default function Stairs({
  src = "/models/stairs.glb",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}) {
  // load your glb
  const { scene } = useGLTF(src);

  return (
    <RigidBody
      type="fixed"
      colliders={false} // we’ll add our own mesh collider
      friction={1} // give it some grip
      restitution={0} // no bounce
    >
      {/* the visible stairs */}
      <primitive
        object={scene}
        position={position}
        rotation={rotation}
        scale={scale}
        receiveShadow
        castShadow
      />
      {/* a precise “triangle mesh” collider matching your Blender-exported geometry */}
      <MeshCollider type="trimesh" />
    </RigidBody>
  );
}
