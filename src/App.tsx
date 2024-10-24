import "./App.css";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { CanvasContent } from "./CanvasContent";

interface DragContextProps {
  pos?: number;
  setPos?: Dispatch<SetStateAction<number>>;
  SetComponent: () => void;
  setDraggedId: Dispatch<SetStateAction<number>>;
  draggedId: number;
}
export const DragContext = createContext<DragContextProps>(
  {} as DragContextProps
);

function App() {
  const [draggedId, setDraggedId] = useState(-1);

  const SetComponent = () => {};
  return (
    <DragContext.Provider value={{ SetComponent, setDraggedId, draggedId }}>
      <CanvasContent></CanvasContent>
    </DragContext.Provider>
  );
}
export default App;
