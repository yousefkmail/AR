import { Canvas } from "@react-three/fiber";
import { DragEvent, MouseEvent, useContext } from "react";
import { useProgress } from "@react-three/drei";
import { CircularProgress } from "@mui/material";
import { useFullPieces } from "../../Hooks/useFullPieces";
import { DraggedPieceContext } from "../../Context/DraggedPieceContext";
import { PieceObject } from "../../Core/PiecePlane";
import { TemplateObject } from "../../Core/Template";
import BuilderCanvasContent from "./BuilderCanvasContent";
export default function BuilderCanvas() {
  const handleDragEnter = (_event: DragEvent) => {
    _event.preventDefault();
  };

  const { DispatchCreatedPieces, DispatchCreatedTemplates } = useFullPieces();
  const { DraggedItem, setDraggedItem } = useContext(DraggedPieceContext);

  const onDrop = (_event: MouseEvent) => {
    if (DraggedItem && "piece" in DraggedItem) {
      DispatchCreatedPieces({
        type: "add",
        payload: DraggedItem as PieceObject,
      });
    }
    if (DraggedItem && "templateModel" in DraggedItem) {
      // if (previewRef.current) {
      //   (DraggedItem as TemplateObject).position = previewRef.current.position;
      // }
      DispatchCreatedTemplates({
        type: "add",
        payload: DraggedItem as TemplateObject,
      });
    }
    setDraggedItem(null);
  };

  const HandleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };
  const { progress } = useProgress();

  return (
    <>
      <Canvas
        gl={{ depth: true, preserveDrawingBuffer: true, alpha: true }}
        onDragEnter={handleDragEnter}
        onDrop={onDrop}
        onDragOver={HandleDragOver}
      >
        <BuilderCanvasContent />
      </Canvas>
      {progress < 100 && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            inset: 0,
            zIndex: 10000,
          }}
        >
          <CircularProgress style={{ position: "absolute" }} />
        </div>
      )}
    </>
  );
}
