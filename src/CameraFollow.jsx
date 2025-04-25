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

//     const followDistance = 5; // 💡 STATIC: Always the same
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
// src/CameraFollow.jsx
// src/CameraFollow.jsx
// src/CameraFollow.jsx
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

export default function CameraFollow({ targetRef }) {
  const { camera } = useThree();

  // We'll fill this once, on the very first frame we get a valid target
  const startConfig = useRef({
    position: new THREE.Vector3(),
    fov: camera.fov,
  });
  const hasInit = useRef(false);

  // For smoothing and intro timing
  const smoothed = useRef(new THREE.Vector3());
  const [introDone, setIntroDone] = useState(false);
  const introTime = useRef(0);

  // Your end‐of‐intro constants
  const { endFov, dollyDistance, dollyHeight, introDuration } = useMemo(
    () => ({
      endFov: 75,
      dollyDistance: 20,
      dollyHeight: 1,
      introDuration: 2,
    }),
    []
  );

  useFrame((_, delta) => {
    const tRef = targetRef.current;
    if (!tRef?.translation || !tRef?.rotation) return;

    // 1) get the runner's current world‐position & forward vector
    const p = tRef.translation();
    const playerPos = new THREE.Vector3(p.x, p.y, p.z);
    const r = tRef.rotation();
    const quat = new THREE.Quaternion(r.x, r.y, r.z, r.w);
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(quat);

    // 2) desired camera position: behind & above the runner
    const desired = playerPos
      .clone()
      .add(forward.clone().multiplyScalar(-dollyDistance))
      .setY(playerPos.y + dollyHeight);

    // ─── INITIALIZE ONCE ────────────────────────────────────────────────────────
    if (!hasInit.current) {
      // snap camera straight behind your runner
      camera.position.copy(desired);
      startConfig.current.position.copy(desired);
      startConfig.current.fov = camera.fov;
      camera.lookAt(
        playerPos
          .clone()
          .add(forward.clone().multiplyScalar(4))
          .setY(playerPos.y + 1)
      );
      hasInit.current = true;
      return; // skip the rest this first frame
    }

    // 3) smooth the runner position for lookAt
    smoothed.current.lerp(playerPos, Math.min(1, delta * 5));

    // 4) INTRO ANIMATION or FOLLOW
    if (!introDone) {
      introTime.current = Math.min(introTime.current + delta, introDuration);
      const t = introTime.current / introDuration;
      const ease = 1 - Math.pow(1 - t, 3);

      // lerp camera from startConfig → desired
      camera.position.lerpVectors(startConfig.current.position, desired, ease);
      camera.fov = THREE.MathUtils.lerp(startConfig.current.fov, endFov, ease);
      camera.updateProjectionMatrix();

      if (t >= 1) setIntroDone(true);
    } else {
      // regular chase‐cam
      camera.position.lerp(desired, 0.05);
      camera.fov += (endFov - camera.fov) * 0.05;
      camera.updateProjectionMatrix();
    }

    // 5) always look a bit ahead & up
    const lookAt = smoothed.current
      .clone()
      .add(forward.clone().multiplyScalar(4))
      .setY(smoothed.current.y + 1);
    camera.lookAt(lookAt);
  });

  return null;
}
