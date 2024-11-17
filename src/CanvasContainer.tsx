import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import {
  useState,
  useContext,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";
import { Environment } from "./Environment";
import { PlanesContainerContext } from "./Context/PlanesContainerContext";
import { Camera, Euler, Scene, WebGLRenderer } from "three";
import DraggableBehaviour from "./DraggableBehaviour";
import {
  ScenePiecesContainerRef,
  ScenePiecesContainer,
} from "./Components/ScenePiecesContainer/ScenePiecesContainer";
import { useFrame, useThree } from "@react-three/fiber";

interface CanvasContainerRefs {
  glRef: MutableRefObject<WebGLRenderer | null>;
  sceneRef: MutableRefObject<Scene | null>;
  cameraRef: MutableRefObject<Camera | null>;
}
export function CanvasContainer({
  cameraRef,
  glRef,
  sceneRef,
}: CanvasContainerRefs) {
  const [cameraRotation] = useState(false);
  const { camera, gl, scene } = useThree();

  glRef.current = gl;
  sceneRef.current = scene;
  cameraRef.current = camera;

  const { ContainerRef } = useContext(PlanesContainerContext);
  const ref = useRef<ScenePiecesContainerRef>(null);
  useEffect(() => {
    ContainerRef.current = ref.current;
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <PerspectiveCamera
        makeDefault
        position={[0, 2, 5]}
        rotation={new Euler(0, 0, 0)}
        fov={50}
      />
      <Environment />

      <DraggableBehaviour />

      <ScenePiecesContainer ref={ref} />

      <OrbitControls enableRotate={cameraRotation} />
    </>
  );
}
