import { Canvas } from "@react-three/fiber";
import { CanvasContainer } from "./CanvasContainer";
import PiecesContainer from "./Components/PiecesContainer/PiecesContainer";
import { useContext, useRef } from "react";
import { DraggedPieceContext } from "./Context/DraggedPieceContext";
import { PiecesContext } from "./Context/PiecesContext";
import { useDrop } from "react-dnd";
import { DragContext } from "./Context/DragContext";
import SceneSettings from "./Components/SceneSettings/SceneSettings";
import { useDragPiece } from "./Hooks/useDragPiece";
import { PiecePlane } from "./Core/PiecePlane";
import { BasisPlane } from "./Core/BasisPlane";
import { useQueryData } from "./Hooks/useQueryData";

export function ObjectBuilder() {
  const { DraggedId } = useContext(DraggedPieceContext);
  const { setCreatedPlanes } = useContext(PiecesContext);

  const { basis, pieces } = useQueryData();

  const counterRef = useRef(0);
  const handleDragEnter = () => {
    if (DraggedId.length < 1) return;

    if (pieces) {
      const piece = pieces.find((item) => item.assetId === DraggedId);

      if (piece) {
        setCreatedPlanes((prevPlanes) => [
          ...prevPlanes,
          new PiecePlane(piece, counterRef.current),
        ]);

        counterRef.current++;
        return;
      }
    }

    if (basis) {
      const base = basis.find((item) => item.assetId === DraggedId);

      if (base) {
        setCreatedPlanes((prevPlanes) => [
          ...prevPlanes,
          new BasisPlane(base, counterRef.current),
        ]);

        counterRef.current++;
        return;
      }
    }
  };

  const [, dropRef] = useDrop(() => ({
    accept: "piece", // Accept draggable items of type "piece"

    collect: (monitor) => ({
      isOver: monitor.isOver(), // True if an item is being hovered over this component
      canDrop: monitor.canDrop(), // True if this component can accept the dragged item
    }),
  }));
  const { DraggedRef, HoveredObject } = useContext(DragContext);
  const { HandleDroppedPlane } = useDragPiece();

  const HandleMouseUp = () => {
    if (DraggedRef.current && HoveredObject.current) {
      HandleDroppedPlane(DraggedRef.current, HoveredObject.current);
    }
    DraggedRef.current = null;
  };
  return (
    <div style={{ height: "100%" }}>
      <PiecesContainer />
      <SceneSettings />
      <Canvas
        gl={{ depth: true }}
        ref={dropRef}
        onDragEnter={handleDragEnter}
        onMouseUp={HandleMouseUp}
        onDrop={HandleMouseUp}
        onPointerLeave={HandleMouseUp}
      >
        <CanvasContainer></CanvasContainer>
      </Canvas>
    </div>
  );
}
