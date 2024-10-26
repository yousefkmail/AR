import "./App.css";
import { createContext, MutableRefObject, useRef } from "react";
import { CanvasContent } from "./CanvasContent";
import { Group } from "three";
import { BrowserRouter } from "react-router-dom";

interface DragContextProps {
  DraggedRef: MutableRefObject<Group | null>;
}

export const DragContext = createContext<DragContextProps>(
  {} as DragContextProps
);

function App() {
  const DraggedRef = useRef<Group | null>(null);

  return (
    <DragContext.Provider value={{ DraggedRef }}>
      <CanvasContent></CanvasContent>
    </DragContext.Provider>
  );
}
export default App;
