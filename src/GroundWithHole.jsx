import { useMemo } from "react";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

export default function GroundWithHole() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.absarc(0, 0, 145, 0, Math.PI * 2, false);

    const hole = new THREE.Path();
    hole.absarc(45, -70, 10, 0, Math.PI * 2, true);
    s.holes.push(hole);

    return s;
  }, []);

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <shapeGeometry args={[shape, 64]} />
        <meshStandardMaterial color="#C2B280" />
      </mesh>
    </RigidBody>
  );
}
