import { useContext } from "react";
import DragableImage from "../DragableImage";
import { PiecesContext } from "../../Context/PiecesContext";
import { DraggedPieceContext } from "../../Context/DraggedPieceContext";

export default function PiecesContainer() {
  const { planes } = useContext(PiecesContext);

  const { setDraggedId } = useContext(DraggedPieceContext);
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 1,
        height: "100%",
      }}
    >
      {planes.map((item: any) => (
        <DragableImage {...item} setDraggedId={setDraggedId} />
      ))}
    </div>
  );
}
