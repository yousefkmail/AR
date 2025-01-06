import React, { Suspense, useContext, useEffect, useRef } from "react";

import { PlanesContainerContext } from "./Context/PlanesContainerContext";
import DraggableBehaviour from "./DraggableBehaviour";
import {
  ScenePiecesContainerRef,
  ScenePiecesContainer,
} from "./Components/ScenePiecesContainer/ScenePiecesContainer";

const Environment = React.lazy(() => import("./Environment"));

export function CanvasContainer() {
  const { ContainerRef } = useContext(PlanesContainerContext);
  const ref = useRef<ScenePiecesContainerRef>(null);
  useEffect(() => {
    ContainerRef.current = ref.current;
  }, []);

  return (
    <>
      <Suspense>
        <Environment />
      </Suspense>
      <DraggableBehaviour />

      <ScenePiecesContainer ref={ref} />
    </>
  );
}
