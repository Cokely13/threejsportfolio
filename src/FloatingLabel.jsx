// import { Text } from "@react-three/drei";
// import { useFrame, useThree } from "@react-three/fiber";
// import { useRef, useState } from "react";

// export default function FloatingLabel({
//   text,
//   position = [0, 0, 0],
//   color = "white",
// }) {
//   const labelRef = useRef();
//   const { camera } = useThree();
//   const [initialY] = useState(position[1]);

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();

//     // Floating effect (subtle sine wave)
//     if (labelRef.current) {
//       labelRef.current.position.y = initialY + Math.sin(t * 1.5) * 0.3;

//       // Always face camera
//       labelRef.current.lookAt(camera.position);
//     }
//   });

//   return (
//     <Text
//       ref={labelRef}
//       position={[position[0], position[1], position[2]]}
//       fontSize={10}
//       color={color}
//       anchorX="center"
//       anchorY="middle"
//       outlineWidth={0.05}
//       outlineColor="#000000"
//     >
//       {text}
//     </Text>
//   );
// }

// components/FloatingLabel.jsx
import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

export default function FloatingLabel({
  text,
  position = [0, 0, 0],
  color = "white",
  floatAmplitude = 0.3,
  floatSpeed = 1.5,
  fontSize = 10,
  outlineWidth = 0.05,
  outlineColor = "#000",
}) {
  const labelRef = useRef();
  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (!labelRef.current) return;
    const t = clock.getElapsedTime();

    // compute the floating Y off the prop
    const y = position[1] + Math.sin(t * floatSpeed) * floatAmplitude;

    // set x/y/z every frame
    labelRef.current.position.set(position[0], y, position[2]);

    // face the camera
    labelRef.current.lookAt(camera.position);
  });

  return (
    <Text
      ref={labelRef}
      // we no longer need a static position prop here,
      // but you still need to give it an initial one
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={outlineWidth}
      outlineColor={outlineColor}
    >
      {text}
    </Text>
  );
}
