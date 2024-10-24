import { Canvas } from "@react-three/fiber";
import { CanvasContainer } from "./CanvasContainer";
import { DragEvent, useContext, useEffect, useState } from "react";
import { DragContext } from "./App";

export function CanvasContent() {
  const [planes, setPlanes] = useState<any>([
    {
      id: 1,
      path: "../Textures/Base_8.89x46.99_L _10KD.png",
      position: [1.6, 0.5, 0.8],
      rotation: [1.62, 0, 0],
    },
    {
      id: 2,
      position: [0, 2.21, 0],
      pivotOffset: [-1.9, 1.95, 0],
      path: "../Textures/Alf Mabrook txt_14.811x27.9058_L_7KD.png",
    },
  ]);

  let StaticPlanes = [
    {
      id: 1,
      path: "../Textures/Base_8.89x46.99_L _10KD.png",
      position: [1.6, 0.5, 0.8],
      rotation: [1.62, 0, 0],
    },
    {
      id: 2,
      position: [0, 2.21, 0],
      pivotOffset: [-1.9, 1.95, 0],
      path: "../Textures/Alf Mabrook txt_14.811x27.9058_L_7KD.png",
    },
  ];

  const [draggedId, setDraggedId] = useState(-1);

  const handleDragEnter = (event: DragEvent<HTMLImageElement>) => {
    if (draggedId < 0) return;

    if (draggedId > StaticPlanes.length) return;

    setPlanes([...planes, StaticPlanes[draggedId]]);
  };

  const HandeleDragStart = (event: DragEvent<HTMLImageElement>) => {
    // Create a transparent drag image to override the default
    const transparentImg = new Image();
    transparentImg.src = ""; // 1x1 transparent gif
    // Set the transparent image to disable the preview
    event.dataTransfer.setDragImage(transparentImg, 0, 0);

    setDraggedId(1);
  };

  const SetIdPosition = (id: number, position: [number, number, number]) => {
    const array = [...planes];

    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        array[i].position = position;
      }
    }
    setPlanes(array);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          backgroundColor: "yellow",
          height: "100%",
        }}
      >
        <div
          onDragStart={HandeleDragStart}
          draggable
          style={{ backgroundColor: "white" }}
        >
          <img
            draggable={false}
            style={{ width: "200px", aspectRatio: "5/1" }}
            src="../Textures/Base_8.89x46.99_L _10KD.png"
            alt=""
          />
        </div>
      </div>
      <Canvas onDragEnter={handleDragEnter}>
        <CanvasContainer
          SetIdPosition={SetIdPosition}
          planes={planes}
          setPlanes={setPlanes}
        ></CanvasContainer>
      </Canvas>
    </div>
  );
}
