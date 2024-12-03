import { createContext, Dispatch, SetStateAction } from "react";
import { BasisPlane } from "../../Core/BasisPlane";
import { PiecePlane } from "../../Core/PiecePlane";

interface ContextMenuProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  menuPosition: { x: number; y: number };
  setMenuPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  activeBasis?: BasisPlane | null;
  setActiveBasis: Dispatch<SetStateAction<BasisPlane | null>>;
  activePiece?: PiecePlane | null;
  setActivePiece: Dispatch<SetStateAction<PiecePlane | null>>;
}

export const ContextMenu_Context = createContext<ContextMenuProps>(
  {} as ContextMenuProps
);
