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
import { HoveredObjectContext } from "./Context/HoveredObjectContext";
import { DragContext } from "./Context/DragContext";
import { Vector3 } from "three";
import SceneSettings from "./Components/SceneSettings/SceneSettings";
export function ObjectBuilder() {
  const { DraggedId } = useContext(DraggedPieceContext);
  const { setCreatedPlanes, createdObjects } = useContext(PiecesContext);

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
    setCreatedPlanes((prevPlanes) => [
      ...prevPlanes,
      {
        ...data.items[DraggedId],
      },
    ]);

    const node = new PlaneNodeData(counterRef.current, data?.items[DraggedId]);
    const fields = data?.items[DraggedId].fields;
    node.rotation = new Vector3(
      fields.rotationX,
      fields.rotationY,
      fields.rotationZ
    );

    createdObjects((prevPlanes) => [...prevPlanes, new PlaneNode(node)]);

    counterRef.current++;
  };

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "piece", // Accept draggable items of type "piece"

    collect: (monitor) => ({
      isOver: monitor.isOver(), // True if an item is being hovered over this component
      canDrop: monitor.canDrop(), // True if this component can accept the dragged item
    }),
  }));
  const { HoveredObject } = useContext(HoveredObjectContext);
  const { DraggedRef } = useContext(DragContext);
  const { HandleDroppedPlane } = useContext(PiecesContext);

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
