import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useState, useContext } from "react";
import PngPlane from "./Components/PngPlane/PngPlane";
import { Environment } from "./Environment";
import DraggableBehaviour from "./DraggableBehaviour";
import { PiecesContext } from "./Context/PiecesContext";
import { Entry } from "contentful";
import { Piece } from "./Contentful/Types/PieceType";

export function CanvasContainer() {
  const [cameraRotation, setCameraRotation] = useState(false);

  const { createdPlanes } = useContext(PiecesContext);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
      <DraggableBehaviour />
      <Environment />

      <group>
        {createdPlanes.map(
          (
            plane: Entry<Piece, "WITHOUT_UNRESOLVABLE_LINKS", string>,
            index: number
          ) => (
            <PngPlane key={index} planeData={plane} />
          )
        )}
      </group>

      <OrbitControls enableRotate={cameraRotation} />
    </>
  );
}
