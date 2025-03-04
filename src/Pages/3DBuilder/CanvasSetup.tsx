import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { Layers } from "three";
import { useCameraControlStore } from "./CameraControlStore";
import { useEffect, useRef } from "react";
export default function CanvasSetup() {
  const layers = new Layers();
  layers.enable(0);
  layers.enable(1);

  const cameraRef = useCameraControlStore((state) => state.cameraControl);

  const camereControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    if (!camereControlsRef.current || !cameraRef) return;
    camereControlsRef.current.azimuthAngle =
      camereControlsRef.current.azimuthAngle;
    camereControlsRef.current.polarAngle = camereControlsRef.current.polarAngle;
  }, [cameraRef]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.2} position={[5, 5, 5]} />
      <PerspectiveCamera layers={layers} position={[1, 1.5, 2]} makeDefault />
      <CameraControls ref={camereControlsRef} enabled={cameraRef} />
    </>
  );
}
