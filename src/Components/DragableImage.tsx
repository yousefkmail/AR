import { DragEvent } from "react";

export default function DragableImage({ path, id, setDraggedId }: any) {
  const HandeleDragStart = (event: DragEvent<HTMLDivElement>) => {
    // Create a transparent drag image to override the default
    const transparentImg = new Image();
    transparentImg.src = ""; // 1x1 transparent gif
    // Set the transparent image to disable the preview
    event.dataTransfer.setDragImage(transparentImg, 0, 0);

    setDraggedId(id);
  };

  return (
    <div
      onDragStart={HandeleDragStart}
      draggable
      style={{ backgroundColor: "white" }}
    >
      <img
        draggable={false}
        style={{ width: "200px", aspectRatio: "5/1" }}
        src={path}
        alt=""
      />
    </div>
  );
}
