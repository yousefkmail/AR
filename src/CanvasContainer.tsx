import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useState, useContext, useEffect, useRef } from "react";
import PngPlane from "./Components/PngPlane/PngPlane";
import { Environment } from "./Environment";
import { PiecesContext } from "./Context/PiecesContext";
import { PlanesContainerContext } from "./Context/PlanesContainerContext";
import { Euler, Group } from "three";
import DraggableBehaviour from "./DraggableBehaviour";

export function CanvasContainer() {
  const [cameraRotation, setCameraRotation] = useState(false);

  const { createdPlanes: objects } = useContext(PiecesContext);
  const containerRef = useRef<Group>(null);
  const { ContainerRef } = useContext(PlanesContainerContext);
  useEffect(() => {
    ContainerRef.current = containerRef.current;
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
      <group ref={containerRef}>
        {objects.map((item) => (
          <PngPlane key={item.data.id} {...item} />
        ))}
      </group>

      <OrbitControls enableRotate={cameraRotation} />
    </>
  );
}
