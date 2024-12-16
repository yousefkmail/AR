import { createContext, Dispatch, SetStateAction } from "react";
import { PiecePlaneViewModel } from "../../Core/Viewmodels/PiecePlaneViewModel";
import { BasisPlaneViewModel } from "../../Core/Viewmodels/BasisPlaneViewModel";

interface ContextMenuProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  menuPosition: { x: number; y: number };
  setMenuPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  activeBasis?: BasisPlaneViewModel | null;
  setActiveBasis: Dispatch<SetStateAction<BasisPlaneViewModel | null>>;
  activePiece?: PiecePlaneViewModel | null;
  setActivePiece: Dispatch<SetStateAction<PiecePlaneViewModel | null>>;
}

export const ContextMenu_Context = createContext<ContextMenuProps>(
  {} as ContextMenuProps
);
