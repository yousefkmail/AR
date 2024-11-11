import { useContext, useEffect } from "react";
import { useDrag } from "react-dnd";
import { DraggedPieceContext } from "../Context/DraggedPieceContext";
import { PlaneModel } from "../Models/PlaneModel";

interface DragableImageProps {
  item: PlaneModel;
  id: string;
}

export default function DragableImage({ id, item }: DragableImageProps) {
  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: "piece",
      item: () => {
        setDraggedId(id); // Example of setting the dragged ID
        return { id };
      },

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  const { setDraggedId } = useContext(DraggedPieceContext);

  useEffect(() => {
    // Set an empty image as the drag preview to disable the default preview
    const emptyImage = new Image();
    emptyImage.src = "";
    // emptyImage.style.height = "0";
    preview(emptyImage);
  }, [preview]);

  return (
    <div
      ref={dragRef}
      className="drag-image"
      style={{
        backgroundColor: "white",
        opacity: isDragging ? 0.5 : 1, // Hide div when dragging
        padding: "10px",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <div className="drag-image-inner">
        <img
          draggable={false}
          style={{
            width: "100%",
            height: "80px",
            aspectRatio: "5/1",
            objectFit: "contain",
          }}
          src={item.texture}
          alt=""
        />
        <div style={{ display: "grid", placeItems: "center" }}>
          <span>{item.name}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span> Size: </span>
          <span> {item.width} </span>
          <span> X </span>
          <span> {item.height} </span>
          <span> cm </span>
        </div>
      </div>
    </div>
  );
}
