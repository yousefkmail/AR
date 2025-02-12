import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { Layers } from "three";
export default function CanvasSetup() {
  const layers = new Layers();
  layers.enable(0);
  layers.enable(1);
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.2} position={[5, 5, 5]} />
      <PerspectiveCamera layers={layers} position={[1, 1.5, 2]} makeDefault />
      <CameraControls />
    </>
  );
}
