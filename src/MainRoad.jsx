import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";
import { useRef, useMemo, useEffect } from "react";

export default function MainRoad(props) {
  const gltf = useLoader(GLTFLoader, "/models/fixedroad.glb");
  const texture = useLoader(TextureLoader, "/textures/cobblestone.jpg");
  const roadRef = useRef();

  const clonedScene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  }, [clonedScene, texture]);

  return <primitive ref={roadRef} object={clonedScene} {...props} />;
}
