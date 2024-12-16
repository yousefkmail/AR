import { DragEvent, useContext } from "react";
import { DraggedPieceContext } from "../Context/DraggedPieceContext";
import DraggableItem from "./DragableItem";
import { BasisModel } from "../DataService/Models/BasisModel";
import { BasisPlaneViewModel } from "../Core/Viewmodels/BasisPlaneViewModel";
import { v4 as uuidv4 } from "uuid";
import { BasisPlane } from "../Core/BasisPlane";
interface DraggablebasisProps {
  item: BasisModel;
}

export default function DraggableBasis({ item }: DraggablebasisProps) {
  const { setDraggedItem } = useContext(DraggedPieceContext);

  const HandleDragStart = () => {
    const id = uuidv4();
    setDraggedItem(new BasisPlaneViewModel(new BasisPlane(item, id)));
  };

  return (
    <DraggableItem
      onDragStart={(event: DragEvent) => {
        const img = new Image();
        img.src = "";
        event.dataTransfer.setDragImage(img, 0, 0);
        HandleDragStart();
      }}
      data={item}
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
