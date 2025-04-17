// BuildingWithDoor.jsx
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

function BuildingWithDoor({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF("/models/firstBuild.glb"); //

  return (
    <RigidBody type="fixed" colliders={false}>
      <primitive
        object={scene}
        position={position}
        rotation={rotation}
        scale={[3, 2, 4]} // or adjust if needed
        castShadow
      />
      <CuboidCollider
        name="building-with-door"
        args={[2, 2, 2]} // tweak this size to fit your building
        position={[position[0], position[1] + 2, position[2]]} // move up if needed
      />
    </RigidBody>
  );
}

export default BuildingWithDoor;
