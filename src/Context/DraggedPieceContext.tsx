import { createContext, Dispatch, SetStateAction, useState } from "react";

interface DraggedPieceContextProps {
  DraggedItem: object | null;
  setDraggedItem: Dispatch<SetStateAction<object | null>>;
}

export const DraggedPieceContext = createContext<DraggedPieceContextProps>(
  {} as DraggedPieceContextProps
);

export const DraggedPieceContextProvider = ({ children }: any) => {
  const [DraggedItem, setDraggedItem] = useState<object | null>(null);

  return (
    <DraggedPieceContext.Provider
      value={{
        DraggedItem,
        setDraggedItem,
      }}
    >
      {children}
    </DraggedPieceContext.Provider>
  );
};
