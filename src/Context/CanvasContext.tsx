import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useRef,
} from "react";
import { Camera, Scene, WebGLRenderer } from "three";

type CanvasContext = {
  scene: MutableRefObject<Scene | null> | null;
  gl: MutableRefObject<WebGLRenderer | null> | null;
  camera: MutableRefObject<Camera | null> | null;
};

export const CanvasContext = createContext<CanvasContext>({
  scene: null,
  gl: null,
  camera: null,
});

export const CanvasContextProvider = (props: PropsWithChildren) => {
  const scene = useRef<Scene | null>(null);
  const gl = useRef<WebGLRenderer | null>(null);
  const camera = useRef<Camera | null>(null);
  return (
    <CanvasContext.Provider value={{ scene, gl, camera }}>
      {props.children}
    </CanvasContext.Provider>
  );
};
