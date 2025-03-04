import { Canvas } from "@react-three/fiber";
import { DragEvent } from "react";
import { useProgress } from "@react-three/drei";
import { CircularProgress } from "@mui/material";
import BuilderCanvasContent from "./BuilderCanvasContent";
import { ObjectPreviewContextProvider } from "@features/DragAndDrop/UIToCanvasDrag/ObjectPreview";
export default function BuilderCanvas() {
  const handleDragEnter = (_event: DragEvent) => {
    _event.preventDefault();
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
        onDragOver={HandleDragOver}
      >
        <ObjectPreviewContextProvider>
          <BuilderCanvasContent />
        </ObjectPreviewContextProvider>
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
            pointerEvents: "none",
          }}
        >
          <CircularProgress style={{ position: "absolute" }} />
        </div>
      )}
    </>
  );
}
