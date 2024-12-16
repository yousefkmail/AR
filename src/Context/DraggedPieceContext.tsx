import { createContext, Dispatch, SetStateAction, useState } from "react";

interface DraggedPieceContextProps {
  CreateDraggedPiece: () => void;
  DraggedItem: object | null;
  setDraggedItem: Dispatch<SetStateAction<object | null>>;
}

export const DraggedPieceContext = createContext<DraggedPieceContextProps>(
  {} as DraggedPieceContextProps
);

export const DraggedPieceContextProvider = ({ children }: any) => {
  const [DraggedItem, setDraggedItem] = useState<object | null>(null);

  const CreateDraggedPiece = () => {
    // DraggedItem?.Drop();
  };

  return (
    <DraggedPieceContext.Provider
      value={{
        CreateDraggedPiece,
        DraggedItem,
        setDraggedItem,
      }}
    >
      {children}
    </DraggedPieceContext.Provider>
  );
};
