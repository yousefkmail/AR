import { useContext, useEffect, useRef } from "react";
import { Environment } from "./Environment";
import { PlanesContainerContext } from "./Context/PlanesContainerContext";
import DraggableBehaviour from "./DraggableBehaviour";
import {
  ScenePiecesContainerRef,
  ScenePiecesContainer,
} from "./Components/ScenePiecesContainer/ScenePiecesContainer";

export function CanvasContainer() {
  const { ContainerRef } = useContext(PlanesContainerContext);
  const ref = useRef<ScenePiecesContainerRef>(null);
  useEffect(() => {
    ContainerRef.current = ref.current;
  }, []);

  return (
    <>
      <Environment />
      <DraggableBehaviour />
      <ScenePiecesContainer ref={ref} />
    </>
  );
}
