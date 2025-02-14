import { Suspense, useContext, useEffect, useRef } from "react";
import CanvasSetup from "./CanvasSetup";
import React from "react";
import { ScenePiecesContainer } from "../../Components/ScenePiecesContainer/ScenePiecesContainer";
import { PlanesContainerContext, ScenePiecesContainerRef } from "@core";
const Environment = React.lazy(() => import("./Environment"));

export default function BuilderCanvasContent() {
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
    </>
  );
}
