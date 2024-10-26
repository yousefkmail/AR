import { createContext, Dispatch, SetStateAction, useState } from "react";

interface DraggedPieceContextProps {
  DraggedId: number;
  setDraggedId: Dispatch<SetStateAction<number>>;
}

export const DraggedPieceContext = createContext<DraggedPieceContextProps>(
  {} as DraggedPieceContextProps
);

export const DraggedPieceContextProvider = ({ children }: any) => {
  const [DraggedId, setDraggedId] = useState<number>(-1);

  return (
    <DraggedPieceContext.Provider value={{ DraggedId, setDraggedId }}>
      {children}
    </DraggedPieceContext.Provider>
  );
};
