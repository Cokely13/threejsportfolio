import { useGLTF, useTexture } from "@react-three/drei";
import { RigidBody, MeshCollider } from "@react-three/rapier";
import { RepeatWrapping, MeshStandardMaterial } from "three";

export default function Wall() {
  const { scene } = useGLTF("/models/curveWall.glb");

  const [brickTexture, normalMap] = useTexture([
    "/textures/brickWall.jpg",
    "/textures/brickWall-normal.png",
  ]);

  brickTexture.wrapS = brickTexture.wrapT = RepeatWrapping;
  brickTexture.repeat.set(10, 2);
  normalMap.wrapS = normalMap.wrapT = RepeatWrapping;
  normalMap.repeat.set(10, 2);

  const brickMaterial = new MeshStandardMaterial({
    map: brickTexture,
    normalMap: normalMap,
    roughness: 0.8,
    metalness: 0.0,
  });

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = brickMaterial;
      child.material.needsUpdate = true;
    }
  });

  // console.log("here", scene);

  return (
    <RigidBody type="fixed" colliders={false} restitution={1} friction={0.5}>
      {/* Visible wall */}
      <primitive
        object={scene}
        position={[2, -32, -20]}
        rotation={[0, -Math.PI / 3.9, 0]}
        scale={[2.2, 8, 2.2]}
      />

      {/* Aligned Collider */}
      <MeshCollider type="trimesh">
        <mesh
          geometry={scene.children[0].geometry}
          position={[2, -32, -20]}
          rotation={[0, -Math.PI / 3.9, 0]}
          scale={[2.2, 8, 2.2]}
        >
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </MeshCollider>
    </RigidBody>
  );
}
