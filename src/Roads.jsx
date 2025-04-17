// import { useGLTF } from "@react-three/drei";
// import { RigidBody } from "@react-three/rapier";
// import { PI } from "three/src/nodes/TSL.js";

// export default function Roads(props) {
//   const { scene } = useGLTF("/models/newRoads2.glb");

//   return (
//     <RigidBody type="fixed" colliders="trimesh" {...props}>
//       <primitive
//         object={scene}
//         dispose={null}
//         position={[5, 0, 12]} // change as needed
//         rotation={[0, (3 * Math.PI) / 2, 0]} // in radians
//         scale={[3, 1, 3]} // uniform scale
//       />
//     </RigidBody>
//   );
// }

import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect } from "react";
import * as THREE from "three";

export default function Roads(props) {
  const { scene, materials } = useGLTF("/models/xroad.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material.name === "roadMat") {
          child.material = new THREE.MeshStandardMaterial({
            color: "#a0a0a0", // light gray for the road
            roughness: 0.8,
          });
        } else if (child.material.name === "edgeMat") {
          child.material = new THREE.MeshStandardMaterial({
            color: "#303030", // dark edge
            roughness: 0.6,
          });
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    // <RigidBody type="fixed" colliders="trimesh" {...props}>
    <primitive
      object={scene}
      dispose={null}
      position={[0, 0.03, 12]}
      rotation={[0, (3 * Math.PI) / 2, 0]}
      scale={[7, 1, 7]}
    />
    // </RigidBody>
  );
}
