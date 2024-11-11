import { createContext, Dispatch, SetStateAction, useState } from "react";

interface DraggedPieceContextProps {
  DraggedId: string;
  setDraggedId: Dispatch<SetStateAction<string>>;
}

export const DraggedPieceContext = createContext<DraggedPieceContextProps>(
  {} as DraggedPieceContextProps
);

export const DraggedPieceContextProvider = ({ children }: any) => {
  const [DraggedId, setDraggedId] = useState<string>("");

  return (
    <DraggedPieceContext.Provider value={{ DraggedId, setDraggedId }}>
      {children}
    </DraggedPieceContext.Provider>
  );
};
