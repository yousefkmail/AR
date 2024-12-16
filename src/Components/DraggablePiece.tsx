import { DragEvent, useContext } from "react";
import { DraggedPieceContext } from "../Context/DraggedPieceContext";
import { PiecePlane } from "../Core/PiecePlane";
import DraggableItem from "./DragableItem";
import { PieceModel } from "../DataService/Models/PieceModel";
import { PiecePlaneViewModel } from "../Core/Viewmodels/PiecePlaneViewModel";
import { v4 as uuidv4 } from "uuid";
interface DraggablePieceProps {
  item: PieceModel;
}

export default function DraggablePiece({ item }: DraggablePieceProps) {
  const { setDraggedItem } = useContext(DraggedPieceContext);

  const HandleDragStart = () => {
    const id = uuidv4();
    setDraggedItem(new PiecePlaneViewModel(new PiecePlane(item, id)));
  };

  return (
    <DraggableItem
      data={item}
      onDragStart={(event: DragEvent) => {
        const img = new Image();
        img.src = "";
        event.dataTransfer.setDragImage(img, 0, 0);
        HandleDragStart();
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
        <div
          style={{
            display: "grid",
            placeItems: "center",
            marginBottom: "7px",
          }}
        >
          <span style={{ fontWeight: "bolder" }}>{item.name}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span> Size: </span>
          <span style={{ fontWeight: "bolder" }}> {item.width} </span>
          <span> X </span>
          <span style={{ fontWeight: "bolder" }}> {item.height} </span>
          <span
            style={{
              borderRadius: "3px",
              marginLeft: "3px",
            }}
          >
            cm
          </span>
        </div>
        <div></div>
      </div>
    </DraggableItem>
  );
}
