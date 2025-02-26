import { useSceneSettingsStore } from "@core/Store/SceneSettingsStore";
import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import { Layers } from "three";
export default function CanvasSetup() {
  const layers = new Layers();
  layers.enable(0);
  layers.enable(1);

  const rotationEnabled = useSceneSettingsStore(
    (state) => state.cameraRotation
  );
  console.log(rotationEnabled);
  const cameraControlsRef = useRef<CameraControls>(null);

  if (rotationEnabled && cameraControlsRef.current) {
    cameraControlsRef.current.azimuthAngle =
      cameraControlsRef.current.azimuthAngle;
    cameraControlsRef.current.polarAngle = cameraControlsRef.current.polarAngle;
  }
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.2} position={[5, 5, 5]} />
      <PerspectiveCamera layers={layers} position={[1, 1.5, 2]} makeDefault />
      <CameraControls ref={cameraControlsRef} enabled={rotationEnabled} />
    </>
  );
}
