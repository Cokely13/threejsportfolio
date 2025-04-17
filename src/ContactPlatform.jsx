import { RigidBody } from "@react-three/rapier";

export default function ContactPlatform({
  position = [0, 0, -90],
  radius = 20,
  height = 2,
  color = "#444",
}) {
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <mesh position={[...position.slice(0, 2), position[2]]}>
        <cylinderGeometry args={[radius, radius, height, 64]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </RigidBody>
  );
}
