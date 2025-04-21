import { useGLTF, useTexture } from "@react-three/drei";
import { RigidBody, MeshCollider } from "@react-three/rapier";
import { RepeatWrapping, MeshStandardMaterial } from "three";

export default function TexturedBuilding({
  src,
  baseMap,
  trimMap,
  position,
  rotation,
  scale,
}) {
  const { scene } = useGLTF(src);
  const [baseTex, trimTex] = useTexture([baseMap, trimMap]);

  // set up tiling
  [baseTex, trimTex].forEach((tex) => {
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(scale[0], scale[2]);
  });

  // apply a two‑material approach
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = child.name.includes("Trim")
        ? new MeshStandardMaterial({ map: trimTex, roughness: 0.5 })
        : new MeshStandardMaterial({ map: baseTex, roughness: 1 });
      child.castShadow = child.receiveShadow = true;
    }
  });

  return (
    <RigidBody type="fixed" colliders="trimesh" friction={1}>
      <primitive
        object={scene}
        position={position}
        rotation={rotation}
        scale={scale}
      />
      <MeshCollider type="trimesh" />
    </RigidBody>
  );
}
