import { Canvas, useThree } from "@react-three/fiber";
import { CanvasContainer } from "./CanvasContainer";
import PiecesContainer from "./Components/PiecesContainer/PiecesContainer";
import { MouseEvent, useContext, useRef } from "react";
import { DraggedPieceContext } from "./Context/DraggedPieceContext";
import { PiecesContext } from "./Context/PiecesContext";
import { DragContext, DragContextProvider } from "./Context/DragContext";
import SceneSettings from "./Components/SceneSettings/SceneSettings";
import { useDragPiece } from "./Hooks/useDragPiece";
import { PiecePlane } from "./Core/PiecePlane";
import { BasisPlane } from "./Core/BasisPlane";
import { usePlanesQuery } from "./Hooks/usePlanesQuery";
import { Camera, Scene, WebGLRenderer } from "three";
import ContextContainer from "./Features/ContextMenu/ContextContainer";
import { useObjectContextMenu } from "./Features/ContextMenu/useObjectContextMenu";

export function ObjectBuilder() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const { DraggedId } = useContext(DraggedPieceContext);
  const { setCreatedPlanes } = useContext(PiecesContext);

  const { basis, pieces } = usePlanesQuery();

  const counterRef = useRef(0);
  const handleDragEnter = () => {
    if (DraggedId.length < 1) return;

    if (pieces) {
      const piece = pieces.find((item) => item.assetId === DraggedId);

      if (piece) {
        setCreatedPlanes((prevPlanes) => [
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
        setCreatedPlanes((prevPlanes) => [
          ...prevPlanes,
          new BasisPlane(base, counterRef.current),
        ]);

        counterRef.current++;
        return;
      }
    }
  };

  const { DraggedRef, HoveredObject } = useContext(DragContext);
  const { HandleDroppedPlane } = useDragPiece();
  const { open, setMenuPosition, setManagedId, close } = useObjectContextMenu();

  const HandleMouseUp = (event: MouseEvent) => {
    if (event.button === 0 && DraggedRef.current) {
      open();
      event.currentTarget.getBoundingClientRect;
      const offsetX =
        event.clientX - event.currentTarget.getBoundingClientRect().left;
      const offsetY =
        event.clientY - event.currentTarget.getBoundingClientRect().top;
      setMenuPosition({ x: offsetX - 80, y: offsetY - 80 });
      setManagedId(DraggedRef.current?.userData.id);
    }
    DraggedRef.current = null;
  };

  const TakeScreenshot = () => {
    const screenshotDataUrl = glRef.current?.domElement.toDataURL("image/png");
    // Create a download link
    if (linkRef.current && screenshotDataUrl) {
      linkRef.current.href = screenshotDataUrl;
      linkRef.current.download = "screenshot.png";
      linkRef.current.click();
    }
  };

  const glRef = useRef<WebGLRenderer>(null);
  const sceneRef = useRef<Scene>(null);
  const cameraRef = useRef<Camera>(null);
  return (
    <div style={{ height: "100%", position: "relative" }}>
      <PiecesContainer />
      <SceneSettings TakeScreenshot={TakeScreenshot} />
      <Canvas
        gl={{ depth: true, preserveDrawingBuffer: true }}
        // ref={dropRef}
        // onPointerDown={() => close()}
        onDragEnter={handleDragEnter}
        // onMouseUp={HandleMouseUp}
      >
        <DragContextProvider>
          <CanvasContainer
            sceneRef={sceneRef}
            cameraRef={cameraRef}
            glRef={glRef}
          ></CanvasContainer>
        </DragContextProvider>
      </Canvas>
      <a ref={linkRef} style={{ display: "none" }} />

      <ContextContainer />
    </div>
  );
}
