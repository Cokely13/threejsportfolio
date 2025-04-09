// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// export default function Road(props) {
//   const gltf = useLoader(GLTFLoader, "/models/road.glb");
//   const roadRef = useRef();

//   useFrame(() => {
//     // optional: animate the road slightly if you want (like moving traffic, etc.)
//   });

//   return (
//     <primitive
//       ref={roadRef}
//       object={gltf.scene}
//       scale={[0.5, 0.5, 0.5]} // Adjust scaling if needed
//       position={[0, 0, 0]} // Adjust starting position
//       {...props} // allow extra props like position, rotation
//     />
//   );
// }

// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// export default function Road(props) {
//   const gltf = useLoader(GLTFLoader, "/models/road.glb");
//   const roadRef = useRef();

//   useFrame(() => {
//     // optional animation
//   });

//   return (
//     <primitive
//       ref={roadRef}
//       object={gltf.scene}
//       scale={[0.1, 0.1, 0.1]} // MUCH smaller (experiment around 0.05–0.2)
//       position={[0, 0, 0]} // [x, y, z] move around to line it up
//       rotation={[0, Math.PI, 0]} // rotate 180° if needed
//       {...props}
//     />
//   );
// }

// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { useRef, useState } from "react";
// import { useFrame } from "@react-three/fiber";
// import { TransformControls } from "@react-three/drei";

// export default function Road(props) {
//   const gltf = useLoader(GLTFLoader, "/models/road.glb");
//   const roadRef = useRef();
//   const [mode, setMode] = useState("translate"); // translate, rotate, scale

//   useFrame(() => {
//     // optional animations
//   });

//   return (
//     <>
//       {/* TransformControls wraps the object you want to move */}
//       <TransformControls
//         object={roadRef}
//         mode={mode} // translate = move, rotate = rotate, scale = scale
//       >
//         <primitive
//           ref={roadRef}
//           object={gltf.scene}
//           scale={[0.1, 0.1, 0.1]} // Start with a reasonable size
//           position={[0, 0, 0]}
//           rotation={[0, Math.PI, 0]} // Might need small tweaks
//           {...props}
//         />
//       </TransformControls>

//       {/* Quick UI for switching between move, rotate, scale */}
//       <div
//         style={{
//           position: "absolute",
//           top: 10,
//           right: 10,
//           display: "flex",
//           flexDirection: "column",
//           gap: "8px",
//         }}
//       >
//         <button onClick={() => setMode("translate")}>Move</button>
//         <button onClick={() => setMode("rotate")}>Rotate</button>
//         <button onClick={() => setMode("scale")}>Scale</button>
//       </div>
//     </>
//   );
// }
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef, useMemo } from "react";

export default function Road(props) {
  const gltf = useLoader(GLTFLoader, "/models/road.glb");
  const roadRef = useRef();

  const clonedScene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  return (
    <primitive
      ref={roadRef}
      object={clonedScene} // <-- ✅ use CLONE!
      {...props}
    />
  );
}
