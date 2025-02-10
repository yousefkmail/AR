import { createContext, Dispatch, SetStateAction, useState } from "react";

interface DraggedPieceContextProps {
  DraggedItem: object | null;
  setDraggedItem: Dispatch<SetStateAction<object | null>>;
}

export const UIDraggedPieceContext = createContext<DraggedPieceContextProps>(
  {} as DraggedPieceContextProps
);

export const DraggedPieceContextProvider = ({ children }: any) => {
  const [DraggedItem, setDraggedItem] = useState<object | null>(null);

  return (
    <UIDraggedPieceContext.Provider
      value={{
        DraggedItem,
        setDraggedItem,
      }}
    >
      {children}
    </UIDraggedPieceContext.Provider>
  );
};
