import { Canvas } from "@react-three/fiber";
import { CanvasContainer } from "./CanvasContainer";
import { useContext, useRef } from "react";
import { DraggedPieceContext } from "./Context/DraggedPieceContext";
import { PiecesContext } from "./Context/PiecesContext";
import { DragContextProvider } from "./Context/DragContext";
import { PiecePlane } from "./Core/PiecePlane";
import { BasisPlane } from "./Core/BasisPlane";
import { usePlanesQuery } from "./Hooks/usePlanesQuery";
import ContextContainer from "./Features/ContextMenu/ContextContainer";
import {
  ScreenShotHandler,
  ScreenShotHandlerRef,
} from "./Components/ScreenShotHandler/ScreenShotHandler";
import WindowsContainer from "./Components/WindowsContainer/WindowsContainer";

export function ObjectBuilder() {
  const ScreenshotterRef = useRef<ScreenShotHandlerRef>(null);
  const { DraggedId } = useContext(DraggedPieceContext);
  const { setCreatedBasis, setCreatedPieces } = useContext(PiecesContext);

  const { basis, pieces } = usePlanesQuery();

  const counterRef = useRef(0);
  const handleDragEnter = () => {
    if (DraggedId.length < 1) return;

    if (pieces) {
      const piece = pieces.find((item) => item.assetId === DraggedId);

      if (piece) {
        setCreatedPieces((prevPlanes) => [
          ...prevPlanes,
          new PiecePlane(piece, counterRef.current),
        ]);

        counterRef.current++;
        return;
      }
    }

    if (basis) {
      const base = basis.find((item) => item.assetId === DraggedId);

      if (base) {
        setCreatedBasis((prevPlanes) => [
          ...prevPlanes,
          new BasisPlane(base, counterRef.current),
        ]);

        counterRef.current++;
        return;
      }
    }
  };

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <WindowsContainer />
      <Canvas
        gl={{ depth: true, preserveDrawingBuffer: true, alpha: true }}
        onDragEnter={handleDragEnter}
      >
        <DragContextProvider>
          <CanvasContainer />
        </DragContextProvider>
        <ScreenShotHandler ref={ScreenshotterRef} />
      </Canvas>
      <ContextContainer />
    </div>
  );
}
