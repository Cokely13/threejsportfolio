// import { useThree, useFrame } from "@react-three/fiber";
// import { useRef } from "react";

// export default function CameraFollow({ targetRef }) {
//   const { camera } = useThree();
//   const smoothedPosition = useRef({ x: 0, y: 0, z: 0 });

//   useFrame((state, delta) => {
//     if (targetRef.current) {
//       const targetPosition = targetRef.current.translation(); // physics position

//       // Smooth the position manually
//       smoothedPosition.current.x +=
//         (targetPosition.x - smoothedPosition.current.x) * 1.5 * delta;
//       smoothedPosition.current.y +=
//         (targetPosition.y - smoothedPosition.current.y) * 1.5 * delta;
//       smoothedPosition.current.z +=
//         (targetPosition.z - smoothedPosition.current.z) * 1.5 * delta;

//       camera.position.lerp(
//         {
//           x: smoothedPosition.current.x,
//           y: smoothedPosition.current.y + 10,
//           z: smoothedPosition.current.z + 20,
//         },
//         0.01 // camera lerp
//       );

//       camera.lookAt(
//         smoothedPosition.current.x,
//         smoothedPosition.current.y + 2,
//         smoothedPosition.current.z
//       );
//     }
//   });

//   return null;
// }

import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CameraFollow({ targetRef }) {
  const { camera } = useThree();
  const smoothedPosition = useRef({ x: 0, y: 0, z: 0 });

  const forwardVector = new THREE.Vector3(0, 0, -1);
  const runnerQuaternion = new THREE.Quaternion();

  useFrame((state, delta) => {
    if (targetRef.current) {
      const targetPosition = targetRef.current.translation();
      const rotation = targetRef.current.rotation();

      if (!targetPosition || !rotation) return;

      runnerQuaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);

      const direction = forwardVector
        .clone()
        .applyQuaternion(runnerQuaternion)
        .normalize();

      // Smooth runner's position (lower smoothing factor for softer movement)
      smoothedPosition.current.x +=
        (targetPosition.x - smoothedPosition.current.x) * 1.2 * delta;
      smoothedPosition.current.y +=
        (targetPosition.y - smoothedPosition.current.y) * 1.2 * delta;
      smoothedPosition.current.z +=
        (targetPosition.z - smoothedPosition.current.z) * 1.2 * delta;

      const followDistance = 10; // Stay this far behind
      const height = 6; // Height above runner
      const followOffset = direction.clone().multiplyScalar(-followDistance);

      const desiredCameraPosition = new THREE.Vector3(
        smoothedPosition.current.x + followOffset.x,
        smoothedPosition.current.y + height,
        smoothedPosition.current.z + followOffset.z
      );

      // ✨ Smoother lerp toward desired camera position
      camera.position.lerp(desiredCameraPosition, 0.05); // LOWER this number = smoother, softer catch-up

      // Look slightly ahead
      const lookAheadDistance = 4; // slightly less aggressive look-ahead
      const lookAtTarget = new THREE.Vector3(
        smoothedPosition.current.x + direction.x * lookAheadDistance,
        smoothedPosition.current.y + 2,
        smoothedPosition.current.z + direction.z * lookAheadDistance
      );

      camera.lookAt(lookAtTarget);
    }
  });

  return null;
}
