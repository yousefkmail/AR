import { Suspense, useContext, useEffect, useRef } from "react";
import CanvasSetup from "./CanvasSetup";
import {
  ScreenShotHandler,
  ScreenShotHandlerRef,
} from "../../Components/ScreenShotHandler/ScreenShotHandler";
import React from "react";
import {
  ScenePiecesContainer,
  ScenePiecesContainerRef,
} from "../../Components/ScenePiecesContainer/ScenePiecesContainer";
import { PlanesContainerContext } from "../../Context/PlanesContainerContext";
const Environment = React.lazy(() => import("../../Environment"));

export default function BuilderCanvasContent() {
  const ScreenshotterRef = useRef<ScreenShotHandlerRef>(null);
  const ref = useRef<ScenePiecesContainerRef>(null);
  const { ContainerRef } = useContext(PlanesContainerContext);

  useEffect(() => {
    ContainerRef.current = ref.current;
  }, []);
  return (
    <>
      <CanvasSetup />
      <Suspense>
        <Environment />
      </Suspense>
      <ScenePiecesContainer ref={ref} />
      <ScreenShotHandler ref={ScreenshotterRef} />
    </>
  );
}
