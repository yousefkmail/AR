import { useContext, useEffect } from "react";
import { useDrag } from "react-dnd";
import { DraggedPieceContext } from "../Context/DraggedPieceContext";
import { Entry } from "contentful";
import { Piece } from "../Contentful/Types/PieceType";

interface DragableImageProps {
  item: Entry<Piece, "WITHOUT_UNRESOLVABLE_LINKS", string>;
  id: number;
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
      }}
    >
      <img
        draggable={false}
        style={{
          width: "100%",
          height: "80px",
          aspectRatio: "5/1",
          objectFit: "contain",
        }}
        src={item.fields.texture?.fields.file?.url}
        alt=""
      />
      <div style={{ display: "grid", placeItems: "center" }}>
        <span>{item.fields.name}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span> Size: </span>
        <span> {item.fields.width} </span>
        <span> X </span>
        <span> {item.fields.height} </span>
        <span> cm </span>
      </div>
    </div>
  );
}
