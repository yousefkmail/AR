import { Canvas } from "@react-three/fiber";
import { CanvasContainer } from "./CanvasContainer";
import { DragEvent, memo, MouseEvent, useContext, useRef } from "react";
import { DraggedPieceContext } from "./Context/DraggedPieceContext";
import { DragContextProvider } from "./Context/DragContext";
import ContextContainer from "./Features/ContextMenu/ContextContainer";
import {
  ScreenShotHandler,
  ScreenShotHandlerRef,
} from "./Components/ScreenShotHandler/ScreenShotHandler";
import WindowsContainer from "./Components/WindowsContainer/WindowsContainer";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { BasisPlaneViewModel } from "./Core/Viewmodels/BasisPlaneViewModel";
import { useObjectPreview } from "./Features/UIToCanvasDrag/Hooks/useObjectPreview";
import { PiecePlaneViewModel } from "./Core/Viewmodels/PiecePlaneViewModel";
import { usePieces } from "./Hooks/usePieces";

export const ObjectBuilder = memo(() => {
  const ScreenshotterRef = useRef<ScreenShotHandlerRef>(null);
  const { CreateDraggedPiece, DraggedItem } = useContext(DraggedPieceContext);
  const { setCreatedBasis, setCreatedPieces } = usePieces();
  const { setPreview, previewRef } = useObjectPreview();
  const handleDragEnter = () => {
    if (DraggedItem && DraggedItem instanceof BasisPlaneViewModel) {
      setPreview(DraggedItem);
    }
    if (DraggedItem && DraggedItem instanceof PiecePlaneViewModel) {
      setPreview(DraggedItem);
    }

    CreateDraggedPiece();
  };

  const HandleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const onDrop = (event: MouseEvent) => {
    if (DraggedItem && DraggedItem instanceof BasisPlaneViewModel) {
      console.log(previewRef.current);
      if (previewRef.current) {
        DraggedItem.BasisPlane.position = previewRef.current.position;
      }
      setCreatedBasis((prev) => [...prev, DraggedItem]);
    }

    if (DraggedItem && DraggedItem instanceof PiecePlaneViewModel) {
      console.log(previewRef.current);
      if (previewRef.current) {
        DraggedItem.PiecePlane.position = previewRef.current.position;
      }
      setCreatedPieces((prev) => [...prev, DraggedItem]);
    }

    setPreview(null);
  };

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <WindowsContainer />

      <Canvas
        gl={{ depth: true, preserveDrawingBuffer: true, alpha: true }}
        onDragEnter={handleDragEnter}
        onDragOver={HandleDragOver}
        onDrop={onDrop}
      >
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.2} position={[5, 5, 5]} />
        <PerspectiveCamera position={[0, 1, 2]} makeDefault />

        <OrbitControls position={[0, 1, 5]} enableRotate={false} />

        <DragContextProvider>
          <CanvasContainer />
        </DragContextProvider>
        <ScreenShotHandler ref={ScreenshotterRef} />
      </Canvas>
      <ContextContainer />
    </div>
  );
});
