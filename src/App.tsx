import "./App.css";
import * as THREE from "three";
import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { CanvasContent } from "./CanvasContent";

interface DragContextProps {
  DraggedRef: MutableRefObject<THREE.Mesh | null>;
}
export const DragContext = createContext<DragContextProps>(
  {} as DragContextProps
);

function App() {
  const DraggedRef = useRef<THREE.Mesh | null>(null);

  return (
    <DragContext.Provider value={{ DraggedRef }}>
      <CanvasContent></CanvasContent>
    </DragContext.Provider>
  );
}
export default App;
