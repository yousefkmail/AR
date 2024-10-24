import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useState } from "react";
import PngPlane from "./Components/PngPlane/PngPlane";
import { Environment } from "./Environment";
import DraggableBehaviour from "./DraggableBehaviour";

export function CanvasContainer({ planes }: any) {
  const [cameraRotation, setCameraRotation] = useState(false);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
      <DraggableBehaviour />
      <Environment />

      <group position={[1.6, -1.5, 0.8]}>
        {planes.map((plane: any, index: number) => (
          <PngPlane key={index} {...plane} />
        ))}
      </group>

      <OrbitControls enableRotate={cameraRotation} />
    </>
  );
}
