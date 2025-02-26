import { Suspense, useContext, useEffect, useRef } from "react";
import CanvasSetup from "./CanvasSetup";
import React from "react";
import { ScenePiecesContainer } from "../../Components/ScenePiecesContainer/ScenePiecesContainer";
import { PlanesContainerContext, ScenePiecesContainerRef } from "@core";
import { CanvasContext } from "../../Context/CanvasContext";
import { useThree } from "@react-three/fiber";
const Environment = React.lazy(() => import("./Environment"));

export default function BuilderCanvasContent() {
  const ref = useRef<ScenePiecesContainerRef>(null);
  const { ContainerRef } = useContext(PlanesContainerContext);

  const {
    scene: sceneRef,
    camera: cameraRef,
    gl: glRef,
  } = useContext(CanvasContext);
  const { scene, camera, gl } = useThree();
  useEffect(() => {
    ContainerRef.current = ref.current;
    if (sceneRef) sceneRef.current = scene;
    if (cameraRef) cameraRef.current = camera;
    if (glRef) glRef.current = gl;
    console.log("refreshing");
  }, [scene, gl, camera]);

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
