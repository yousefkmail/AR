import { Canvas } from "@react-three/fiber";
import { CanvasContainer } from "./CanvasContainer";
import PiecesContainer from "./Components/PiecesContainer/PiecesContainer";
import { useContext, useEffect } from "react";
import { DraggedPieceContext } from "./Context/DraggedPieceContext";
import { PiecesContext } from "./Context/PiecesContext";
import { DragEvent } from "react";

export function CanvasContent() {
  const { DraggedId } = useContext(DraggedPieceContext);
  const { planes, createdPlanes, setCreatedPlanes } = useContext(PiecesContext);

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    console.log(DraggedId);
    if (DraggedId < 0) return;

    if (DraggedId > planes.length) return;

    setCreatedPlanes((prevPlanes) => [
      ...prevPlanes,
      {
        ...planes[DraggedId],
      },
    ]);
  };

  useEffect(() => {
    console.log(createdPlanes);
  }, [createdPlanes]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PiecesContainer />
      <Canvas onDragEnter={handleDragEnter}>
        <CanvasContainer></CanvasContainer>
      </Canvas>
    </div>
  );
}
