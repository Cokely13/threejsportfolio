import { useMemo } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { TextureLoader, RepeatWrapping, MeshStandardMaterial } from "three";

export default function GroundWithHole() {
  // generate the donut shape with a hole
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.absarc(0, 0, 145, 0, Math.PI * 2, false);

    const hole = new THREE.Path();
    hole.absarc(45, -70, 10, 0, Math.PI * 2, true);
    s.holes.push(hole);

    return s;
  }, []);

  // load your dark grass textures
  const [colorMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
    "/textures/darkGrass-JPG/Grass003_2K-JPG_Color.jpg",
    "/textures/darkGrass-JPG/Grass003_2K-JPG_NormalGL.jpg",
    "/textures/darkGrass-JPG/Grass003_2K-JPG_Roughness.jpg",
  ]);

  // configure tiling
  [colorMap, normalMap, roughnessMap].forEach((tex) => {
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(60, 60);
  });

  // shared grass material
  const grassMaterial = new MeshStandardMaterial({
    map: colorMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    roughness: 1,
  });

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <shapeGeometry args={[shape, 64]} />
        {/* apply textured grass material */}
        <primitive object={grassMaterial} attach="material" />
      </mesh>
    </RigidBody>
  );
}
