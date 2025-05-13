// src/GroundClipper.jsx
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";

export default function GroundClipper({ height = 0 }) {
  const { gl } = useThree();

  useEffect(() => {
    // enable local clipping
    gl.localClippingEnabled = true;
    // plane normal (0,1,0) means “clip everything below y = height”
    gl.clippingPlanes = [new THREE.Plane(new THREE.Vector3(0, 1, 0), -height)];
  }, [gl, height]);

  return null;
}
