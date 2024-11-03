import { createContext, MutableRefObject, useRef } from "react";
import { Group } from "three";

interface DragContextProps {
  DraggedRef: MutableRefObject<Group | null>;
}

export const DragContext = createContext<DragContextProps>(
  {} as DragContextProps
);

export const DragContextProvider = ({ children }: any) => {
  const DraggedRef = useRef<Group | null>(null);

  return (
    <DragContext.Provider value={{ DraggedRef }}>
      {children}
    </DragContext.Provider>
  );
};
