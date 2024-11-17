import { createContext, Dispatch, SetStateAction } from "react";

interface ContextMenuProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  managedId: number;
  setManagedId: Dispatch<SetStateAction<number>>;
  menuPosition: { x: number; y: number };
  setMenuPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
}

export const ContextMenu_Context = createContext<ContextMenuProps>(
  {} as ContextMenuProps
);
