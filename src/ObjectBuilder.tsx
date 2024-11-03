import { Canvas } from "@react-three/fiber";
import { CanvasContainer } from "./CanvasContainer";
import PiecesContainer from "./Components/PiecesContainer/PiecesContainer";
import { useContext } from "react";
import { DraggedPieceContext } from "./Context/DraggedPieceContext";
import { PiecesContext } from "./Context/PiecesContext";
import { DragEvent } from "react";
import { useDrop } from "react-dnd";
import { GetAllPieces } from "./Contentful/ContentfulClient";
import { useQuery } from "@tanstack/react-query";

export function ObjectBuilder() {
  const { DraggedId } = useContext(DraggedPieceContext);
  const { setCreatedPlanes } = useContext(PiecesContext);

  const { data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      return await GetAllPieces();
    },
  });

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
  };

  // const onDrop = () => {};

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "piece", // Accept draggable items of type "piece"
    // drop: (item) => onDrop(item), // Call onDrop with the dragged item when dropped
    collect: (monitor) => ({
      isOver: monitor.isOver(), // True if an item is being hovered over this component
      canDrop: monitor.canDrop(), // True if this component can accept the dragged item
    }),
  }));

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PiecesContainer />
      <Canvas gl={{ depth: true }} ref={dropRef} onDragEnter={handleDragEnter}>
        <CanvasContainer></CanvasContainer>
      </Canvas>
    </div>
  );
}
