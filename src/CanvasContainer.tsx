import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useState, useContext, useEffect, useRef } from "react";
import { Environment } from "./Environment";
import { PlanesContainerContext } from "./Context/PlanesContainerContext";
import { Euler } from "three";
import DraggableBehaviour from "./DraggableBehaviour";
import {
  ScenePiecesContainerRef,
  ScenePiecesContainer,
} from "./Components/ScenePiecesContainer/ScenePiecesContainer";

export function CanvasContainer() {
  const [cameraRotation] = useState(false);

  const { ContainerRef } = useContext(PlanesContainerContext);
  const ref = useRef<ScenePiecesContainerRef>(null);
  useEffect(() => {
    ContainerRef.current = ref.current;
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <PerspectiveCamera
        makeDefault
        position={[0, 2, 5]}
        rotation={new Euler(0, 0, 0)}
        fov={50}
      />
      <Environment />

      <DraggableBehaviour />

      <ScenePiecesContainer ref={ref} />

      <OrbitControls enableRotate={cameraRotation} />
    </>
  );
}
