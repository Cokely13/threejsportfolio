// import { useThree, useFrame } from "@react-three/fiber";
// import { useRef, useState } from "react";
// import * as THREE from "three";

// export default function CameraFollow({ targetRef }) {
//   const { camera } = useThree();
//   const smoothedPosition = useRef({ x: 0, y: 0, z: 0 });
//   const [introDone, setIntroDone] = useState(false);
//   const introProgress = useRef(0); // between 0 and 1

//   useFrame((state, delta) => {
//     if (!targetRef.current) return;

//     const targetPosition = targetRef.current.translation();
//     if (!targetPosition) return;

//     // Smooth player following
//     smoothedPosition.current.x +=
//       (targetPosition.x - smoothedPosition.current.x) * 1.2 * delta;
//     smoothedPosition.current.y +=
//       (targetPosition.y - smoothedPosition.current.y) * 1.2 * delta;
//     smoothedPosition.current.z +=
//       (targetPosition.z - smoothedPosition.current.z) * 1.2 * delta;

//     const followDistance = 10;
//     const height = 6;
//     const forwardVector = new THREE.Vector3(0, 0, -1);
//     const runnerQuaternion = new THREE.Quaternion();
//     runnerQuaternion.set(
//       targetRef.current.rotation().x,
//       targetRef.current.rotation().y,
//       targetRef.current.rotation().z,
//       targetRef.current.rotation().w
//     );

//     const direction = forwardVector
//       .applyQuaternion(runnerQuaternion)
//       .normalize();
//     const followOffset = direction.clone().multiplyScalar(-followDistance);

//     const desiredCameraPosition = new THREE.Vector3(
//       smoothedPosition.current.x + followOffset.x,
//       smoothedPosition.current.y + height,
//       smoothedPosition.current.z + followOffset.z
//     );

//     if (!introDone) {
//       // 🎥 Intro cinematic move
//       introProgress.current += delta * 0.5;

//       if (introProgress.current >= 1) {
//         introProgress.current = 1;
//         setIntroDone(true);
//       }

//       // Start way higher and farther back
//       const startPos = new THREE.Vector3(
//         smoothedPosition.current.x,
//         smoothedPosition.current.y + 80, // super high
//         smoothedPosition.current.z + 250 // super far
//       );

//       // End position for intro (still behind and higher than normal)
//       const midPoint = new THREE.Vector3(
//         smoothedPosition.current.x,
//         smoothedPosition.current.y + 20,
//         smoothedPosition.current.z + 20
//       );

//       const introCameraPosition = startPos.lerp(
//         midPoint,
//         introProgress.current
//       );

//       camera.position.copy(introCameraPosition);
//     } else {
//       // Normal smooth follow
//       camera.position.lerp(desiredCameraPosition, 0.05);
//     }

//     // Look at the runner + slight look ahead
//     const lookAheadDistance = 4;
//     const lookAtTarget = new THREE.Vector3(
//       smoothedPosition.current.x + direction.x * lookAheadDistance,
//       smoothedPosition.current.y + 2,
//       smoothedPosition.current.z + direction.z * lookAheadDistance
//     );

//     camera.lookAt(lookAtTarget);
//   });

//   return null;
// }

import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function CameraFollow({ targetRef }) {
  const { camera } = useThree();
  const smoothedPosition = useRef({ x: 0, y: 0, z: 0 });
  const [introDone, setIntroDone] = useState(false);
  const introProgress = useRef(0);

  useFrame((state, delta) => {
    if (!targetRef.current) return;

    const targetPosition = targetRef.current.translation();
    if (!targetPosition || Number.isNaN(targetPosition.x)) return;

    smoothedPosition.current.x +=
      (targetPosition.x - smoothedPosition.current.x) * 1.2 * delta;
    smoothedPosition.current.y +=
      (targetPosition.y - smoothedPosition.current.y) * 1.2 * delta;
    smoothedPosition.current.z +=
      (targetPosition.z - smoothedPosition.current.z) * 1.2 * delta;

    const rotation = targetRef.current.rotation();
    if (!rotation || Number.isNaN(rotation.x)) return;

    const runnerQuaternion = new THREE.Quaternion(
      rotation.x,
      rotation.y,
      rotation.z,
      rotation.w
    );

    const forwardVector = new THREE.Vector3(0, 0, -1);
    const direction = forwardVector
      .applyQuaternion(runnerQuaternion)
      .normalize();

    const followDistance = 20; // 💡 STATIC: Always the same
    const followOffset = direction.clone().multiplyScalar(-followDistance);

    const desiredCameraPosition = new THREE.Vector3(
      smoothedPosition.current.x + followOffset.x,
      smoothedPosition.current.y + 6,
      smoothedPosition.current.z + followOffset.z
    );

    if (!introDone) {
      introProgress.current += delta * 0.5;
      if (introProgress.current >= 1) {
        introProgress.current = 1;
        setIntroDone(true);
      }

      const startPos = new THREE.Vector3(
        smoothedPosition.current.x,
        smoothedPosition.current.y + 80,
        smoothedPosition.current.z + 250
      );

      const endPos = new THREE.Vector3(
        smoothedPosition.current.x,
        smoothedPosition.current.y + 20,
        smoothedPosition.current.z + 30
      );

      const introCameraPosition = startPos
        .clone()
        .lerp(endPos, introProgress.current);
      camera.position.copy(introCameraPosition);
    } else {
      camera.position.lerp(desiredCameraPosition, 0.05);
    }

    const lookAheadDistance = 4;
    const lookAtTarget = new THREE.Vector3(
      smoothedPosition.current.x + direction.x * lookAheadDistance,
      smoothedPosition.current.y + 2,
      smoothedPosition.current.z + direction.z * lookAheadDistance
    );

    camera.lookAt(lookAtTarget);
  });

  return null;
}
