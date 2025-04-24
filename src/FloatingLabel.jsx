// // components/FloatingLabel.jsx
// import { Text } from "@react-three/drei";
// import { useFrame, useThree } from "@react-three/fiber";
// import { useRef } from "react";

// export default function FloatingLabel({
//   text,
//   position = [0, 0, 0],
//   color = "white",
//   floatAmplitude = 0.3,
//   floatSpeed = 1.5,
//   fontSize = 10,
//   outlineWidth = 0.05,
//   outlineColor = "#000",
// }) {
//   const labelRef = useRef();
//   const { camera } = useThree();

//   useFrame(({ clock }) => {
//     if (!labelRef.current) return;
//     const t = clock.getElapsedTime();

//     // compute the floating Y off the prop
//     const y = position[1] + Math.sin(t * floatSpeed) * floatAmplitude;

//     // set x/y/z every frame
//     labelRef.current.position.set(position[0], y, position[2]);

//     // face the camera
//     labelRef.current.lookAt(camera.position);
//   });

//   return (
//     <Text
//       ref={labelRef}
//       // we no longer need a static position prop here,
//       // but you still need to give it an initial one
//       position={position}
//       fontSize={fontSize}
//       color={color}
//       anchorX="center"
//       anchorY="middle"
//       outlineWidth={outlineWidth}
//       outlineColor={outlineColor}
//     >
//       {text}
//     </Text>
//   );
// }

// src/components/FloatingLabel.jsx
import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

export default function FloatingLabel({
  text,
  position = [0, 0, 0],
  // you can still override per-instance,
  // but if you don't we'll pick from this map:
  color,
  floatAmplitude = 0.3,
  floatSpeed = 1.5,
  fontSize = 10,
  outlineWidth = 0.05,
  outlineColor = "#000",
}) {
  const labelRef = useRef();
  const { camera } = useThree();

  // default colors per section
  const defaultColors = {
    Projects: "#08d9d6", // teal
    Skills: "#ffd32a", // yellow
    About: "#ff2e63", // pink
    Contact: "#32ff7e", // green
  };
  const textColor = color || defaultColors[text] || "white";

  useFrame(({ clock }) => {
    if (!labelRef.current) return;
    const t = clock.getElapsedTime();

    // floating motion
    const y = position[1] + Math.sin(t * floatSpeed) * floatAmplitude;
    labelRef.current.position.set(position[0], y, position[2]);

    // face the camera
    labelRef.current.lookAt(camera.position);
  });

  return (
    <Text
      ref={labelRef}
      position={position}
      fontSize={fontSize}
      color={textColor}
      anchorX="center"
      anchorY="middle"
      outlineWidth={outlineWidth}
      outlineColor={outlineColor}
    >
      {text}
    </Text>
  );
}
