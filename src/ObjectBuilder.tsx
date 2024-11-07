import { Canvas } from "@react-three/fiber";
import { CanvasContainer } from "./CanvasContainer";
import PiecesContainer from "./Components/PiecesContainer/PiecesContainer";
import { useContext, useRef } from "react";
import { DraggedPieceContext } from "./Context/DraggedPieceContext";
import { PiecesContext } from "./Context/PiecesContext";
import { DragEvent } from "react";
import { useDrop } from "react-dnd";
import { GetAllPieces } from "./Contentful/ContentfulClient";
import { useQuery } from "@tanstack/react-query";
import { PlaneNode, PlaneNodeData } from "./Core/PlaneObject";
import { DragContext } from "./Context/DragContext";
import { Vector3 } from "three";
import SceneSettings from "./Components/SceneSettings/SceneSettings";
import { useDragPiece } from "./Hooks/useDragPiece";
export function ObjectBuilder() {
  const { DraggedId } = useContext(DraggedPieceContext);
  const { setCreatedPlanes } = useContext(PiecesContext);

  const { data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      return await GetAllPieces();
    },
  });
  const counterRef = useRef(0);
  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    if (DraggedId < 0) return;
    if (data?.items && DraggedId > data?.items.length) return;

    if (!data) return;

    const node = new PlaneNodeData(counterRef.current, data?.items[DraggedId]);
    const fields = data?.items[DraggedId].fields;
    node.rotation = new Vector3(
      fields.rotationX,
      fields.rotationY,
      fields.rotationZ
    );

    setCreatedPlanes((prevPlanes) => [...prevPlanes, new PlaneNode(node)]);

    counterRef.current++;
  };

  const [{ isOver }, dropRef] = useDrop(() => ({
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
    <div style={{ width: "100%", height: "100%" }}>
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
