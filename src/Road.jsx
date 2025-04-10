// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { useRef, useMemo } from "react";

// export default function Road(props) {
//   const gltf = useLoader(GLTFLoader, "/models/road.glb");
//   const roadRef = useRef();

//   const clonedScene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

//   return (
//     <primitive
//       ref={roadRef}
//       object={clonedScene} // <-- ✅ use CLONE!
//       {...props}
//     />
//   );
// }

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";
import { useRef, useMemo, useEffect } from "react";

export default function Road(props) {
  const gltf = useLoader(GLTFLoader, "/models/myroad.glb"); // 🛣️ your road model
  const texture = useLoader(TextureLoader, "/textures/cobblestone.jpg"); // 🎨 your texture
  const roadRef = useRef();

  // Clone the scene so we can reuse it safely
  const clonedScene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  // Once cloned, apply the texture to all meshes inside
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  }, [clonedScene, texture]);

  return (
    <primitive
      ref={roadRef}
      object={clonedScene}
      {...props} // allows you to pass in position, rotation, scale
    />
  );
}
