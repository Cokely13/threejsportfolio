import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Scene from "./Scene";
import "./styles.css";

function App() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 15, 30], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} />

        <Physics gravity={[0, -9.81, 0]}>
          <Scene />
        </Physics>

        <OrbitControls
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}

export default App;
