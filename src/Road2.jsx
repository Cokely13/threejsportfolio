import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef, useMemo } from "react";

export default function Road2(props) {
  const gltf = useLoader(GLTFLoader, "/models/road.glb");
  const roadRef = useRef();

  const clonedScene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  return <primitive ref={roadRef} object={clonedScene} {...props} />;
}
