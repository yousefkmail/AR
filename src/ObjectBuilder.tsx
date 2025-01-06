import { Canvas } from "@react-three/fiber";
import { CanvasContainer } from "./CanvasContainer";
import { DragEvent, MouseEvent, useContext, useRef } from "react";
import { DraggedPieceContext } from "./Context/DraggedPieceContext";
import { DragContextProvider } from "./Context/DragContext";
import ContextContainer from "./Features/ContextMenu/ContextContainer";
import {
  ScreenShotHandler,
  ScreenShotHandlerRef,
} from "./Components/ScreenShotHandler/ScreenShotHandler";
import WindowsContainer from "./Components/WindowsContainer/WindowsContainer";
import {
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from "@react-three/drei";
import { BasisPlaneViewModel } from "./Core/Viewmodels/BasisPlaneViewModel";
import { useObjectPreview } from "./Features/UIToCanvasDrag/Hooks/useObjectPreview";
import { PiecePlaneViewModel } from "./Core/Viewmodels/PiecePlaneViewModel";
import { useFullPieces } from "./Hooks/useFullPieces";
import { CircularProgress } from "@mui/material";
import Sidenav from "./Components/Sidenav/Sidenav";

export const ObjectBuilder = () => {
  const ScreenshotterRef = useRef<ScreenShotHandlerRef>(null);
  const { CreateDraggedPiece, DraggedItem, setDraggedItem } =
    useContext(DraggedPieceContext);
  const { DispatchCreatedBasis, DispatchCreatedPieces } = useFullPieces();
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

  const onDrop = (_event: MouseEvent) => {
    if (DraggedItem && DraggedItem instanceof BasisPlaneViewModel) {
      if (previewRef.current) {
        DraggedItem.BasisPlane.position = previewRef.current.position;
      }
      DispatchCreatedBasis({ type: "add", payload: DraggedItem });
    }

    if (DraggedItem && DraggedItem instanceof PiecePlaneViewModel) {
      if (previewRef.current) {
        DraggedItem.PiecePlane.position = previewRef.current.position;
      }
      DispatchCreatedPieces({ type: "add", payload: DraggedItem });
    }
    setDraggedItem(null);
    setPreview(null);
  };

  const { progress } = useProgress();

  return (
    <div style={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <WindowsContainer />
      <Sidenav />
      <Canvas
        gl={{ depth: true, preserveDrawingBuffer: true, alpha: true }}
        onDragEnter={handleDragEnter}
        onDragOver={HandleDragOver}
        onDrop={onDrop}
      >
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.2} position={[5, 5, 5]} />
        <PerspectiveCamera position={[1, 1.5, 2]} makeDefault />

        <OrbitControls target={[1, 0.5, -2]} enableRotate={false} />

        <DragContextProvider>
          <CanvasContainer key={0} />
        </DragContextProvider>
        <ScreenShotHandler ref={ScreenshotterRef} />
      </Canvas>
      <ContextContainer />
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
    </div>
  );
};
