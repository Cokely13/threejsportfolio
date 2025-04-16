// // FloatingLabel.jsx
// import { Text } from "@react-three/drei";
// import { useFrame, useThree } from "@react-three/fiber";
// import { useRef } from "react";

// export default function FloatingLabel({
//   text,
//   position = [0, 5, 0],
//   color = "white",
// }) {
//   const labelRef = useRef();
//   const { camera } = useThree();

//   useFrame(() => {
//     if (labelRef.current) {
//       labelRef.current.quaternion.copy(camera.quaternion); // always face camera
//     }
//   });

//   return (
//     <Text
//       ref={labelRef}
//       position={position}
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

import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function FloatingLabel({
  text,
  position = [0, 5, 0],
  color = "white",
}) {
  const labelRef = useRef();
  const { camera } = useThree();
  const [initialY] = useState(position[1]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Floating effect (subtle sine wave)
    if (labelRef.current) {
      labelRef.current.position.y = initialY + Math.sin(t * 1.5) * 0.3;

      // Always face camera
      labelRef.current.lookAt(camera.position);
    }
  });

  return (
    <Text
      ref={labelRef}
      position={[position[0], position[1], position[2]]}
      fontSize={10}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.05}
      outlineColor="#000000"
    >
      {text}
    </Text>
  );
}
