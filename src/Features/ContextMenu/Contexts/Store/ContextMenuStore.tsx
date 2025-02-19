import { ReactNode } from "react";
import { create } from "zustand";

interface ContextMenuProps {
  isOpened: boolean;
  setIsOpened: (state: boolean) => void;
  menuPosition: { x: number; y: number };
  setMenuPosition: (posX: number, posY: number) => void;
  setMenu: (menu: ReactNode) => void;
  menu: ReactNode;
}

export const useContextMenuStore = create<ContextMenuProps>((set) => ({
  isOpened: false,
  setIsOpened: (state: boolean) => set({ isOpened: state }),
  menuPosition: { x: 0, y: 0 },
  setMenuPosition: (posX: number, posY: number) =>
    set({ menuPosition: { x: posX, y: posY } }),
  setMenu: (menu: ReactNode) => set({ menu: menu }),
  menu: null,
}));
