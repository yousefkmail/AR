import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
export default function CanvasSetup() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.2} position={[5, 5, 5]} />
      <PerspectiveCamera position={[1, 1.5, 2]} makeDefault />
      <OrbitControls target={[1, 0.5, -2]} enableRotate={false} />
    </>
  );
}
