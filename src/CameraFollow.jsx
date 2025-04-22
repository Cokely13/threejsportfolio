// import { useThree, useFrame } from "@react-three/fiber";
// import { useRef, useState } from "react";
// import * as THREE from "three";

// export default function CameraFollow({ targetRef }) {
//   const { camera } = useThree();
//   const smoothedPosition = useRef({ x: 0, y: 0, z: 0 });
//   const [introDone, setIntroDone] = useState(false);
//   const introProgress = useRef(0);

//   useFrame((state, delta) => {
//     if (!targetRef.current) return;

//     const targetPosition = targetRef.current.translation();
//     if (!targetPosition || Number.isNaN(targetPosition.x)) return;

//     smoothedPosition.current.x +=
//       (targetPosition.x - smoothedPosition.current.x) * 1.2 * delta;
//     smoothedPosition.current.y +=
//       (targetPosition.y - smoothedPosition.current.y) * 1.2 * delta;
//     smoothedPosition.current.z +=
//       (targetPosition.z - smoothedPosition.current.z) * 1.2 * delta;

//     const rotation = targetRef.current.rotation();
//     if (!rotation || Number.isNaN(rotation.x)) return;

//     const runnerQuaternion = new THREE.Quaternion(
//       rotation.x,
//       rotation.y,
//       rotation.z,
//       rotation.w
//     );

//     const forwardVector = new THREE.Vector3(0, 0, -1);
//     const direction = forwardVector
//       .applyQuaternion(runnerQuaternion)
//       .normalize();

//     const followDistance = 30; // 💡 STATIC: Always the same
//     const followOffset = direction.clone().multiplyScalar(-followDistance);

//     const desiredCameraPosition = new THREE.Vector3(
//       smoothedPosition.current.x + followOffset.x,
//       smoothedPosition.current.y + 6,
//       smoothedPosition.current.z + followOffset.z
//     );

//     if (!introDone) {
//       introProgress.current += delta * 0.5;
//       if (introProgress.current >= 1) {
//         introProgress.current = 1;
//         setIntroDone(true);
//       }

//       const startPos = new THREE.Vector3(
//         smoothedPosition.current.x,
//         smoothedPosition.current.y + 80,
//         smoothedPosition.current.z + 250
//       );

//       const endPos = new THREE.Vector3(
//         smoothedPosition.current.x,
//         smoothedPosition.current.y + 20,
//         smoothedPosition.current.z + 30
//       );

//       const introCameraPosition = startPos
//         .clone()
//         .lerp(endPos, introProgress.current);
//       camera.position.copy(introCameraPosition);
//     } else {
//       camera.position.lerp(desiredCameraPosition, 0.05);
//     }

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

// src/CameraFollow.jsx
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

export default function CameraFollow({ targetRef }) {
  const { camera } = useThree();

  // smoothed world‑space position of the target
  const smoothed = useRef(new THREE.Vector3());

  // intro timing
  const [introDone, setIntroDone] = useState(false);
  const introTime = useRef(0);

  // cache start / end configs
  const {
    startPos,
    startFov,
    endFov,
    dollyDistance,
    dollyHeight,
    introDuration,
  } = useMemo(
    () => ({
      // where the camera begins:
      startPos: new THREE.Vector3(0, 80, 250),
      startFov: 80,
      // final camera FOV
      endFov: 50,
      // relative offset from player at end of intro
      dollyDistance: 30,
      dollyHeight: 6,
      // how long intro lasts (seconds)
      introDuration: 3,
    }),
    []
  );

  useFrame((_, delta) => {
    const tRef = targetRef.current;
    if (!tRef) return;

    // get player world pos
    const p = tRef.translation();
    if (!p) return;
    const playerPos = new THREE.Vector3(p.x, p.y, p.z);

    // 1) smooth the target pos
    smoothed.current.lerp(playerPos, 1.2 * delta);

    // 2) compute the follower offset (behind the player)
    const rot = tRef.rotation();
    const quat = new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w);
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(quat);
    const offset = forward.clone().multiplyScalar(-dollyDistance);
    offset.y = dollyHeight;

    // 3) desired end‑of‑intro camera pos
    const desired = smoothed.current.clone().add(offset);

    if (!introDone) {
      // accumulate intro time
      introTime.current = Math.min(introTime.current + delta, introDuration);
      const t = introTime.current / introDuration;

      // simple ease‑out cubic
      const ease = 1 - Math.pow(1 - t, 3);

      // lerp camera position
      camera.position.lerpVectors(startPos, desired, ease);

      // lerp FOV
      camera.fov = THREE.MathUtils.lerp(startFov, endFov, ease);
      camera.updateProjectionMatrix();

      if (t >= 1) setIntroDone(true);
    } else {
      // regular follow
      camera.position.lerp(desired, 0.05);
      // ensure FOV is back to endFov
      camera.fov += (endFov - camera.fov) * 0.05;
      camera.updateProjectionMatrix();
    }

    // always look at a little ahead of the player
    const lookAt = smoothed.current
      .clone()
      .add(forward.clone().multiplyScalar(4))
      .setY(smoothed.current.y + 2);
    camera.lookAt(lookAt);
  });

  return null;
}
