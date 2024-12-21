import { Suspense, useContext, useEffect, useRef } from "react";
import { Environment } from "./Environment";
import { PlanesContainerContext } from "./Context/PlanesContainerContext";
import DraggableBehaviour from "./DraggableBehaviour";
import {
  ScenePiecesContainerRef,
  ScenePiecesContainer,
} from "./Components/ScenePiecesContainer/ScenePiecesContainer";
import { useProgress } from "@react-three/drei";

export function CanvasContainer() {
  const { ContainerRef } = useContext(PlanesContainerContext);
  const ref = useRef<ScenePiecesContainerRef>(null);
  useEffect(() => {
    ContainerRef.current = ref.current;
  }, []);

  const { progress } = useProgress();

  useEffect(() => {
    console.log(progress);
  }, [progress]);

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
