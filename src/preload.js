// src/preload.js
import { useGLTF, useTexture } from "@react-three/drei";

// fire off all the requests as soon as this module is imported
useGLTF.preload("/models/build1.glb");
useGLTF.preload("/models/build2.glb");
useGLTF.preload("/models/build3.glb");
useGLTF.preload("/models/build4.glb");

useTexture.preload([
  "/textures/Concrete-JPG/Concrete034_2K-JPG_Color.jpg",
  /* …all your other texture paths… */
]);
