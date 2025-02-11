import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { TemplateObject } from "../../Data/R3F/Template";
import { PieceObject } from "../../Data/R3F/PiecePlane";
import { PieceChild } from "../../Data/Models/TemplateModel";

interface ContextMenuProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  menuPosition: { x: number; y: number };
  setMenuPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  activeObject: TemplateObject | PieceObject | PieceChild | null;
  setActiveObject: Dispatch<
    SetStateAction<TemplateObject | PieceObject | PieceChild | null>
  >;
  setMenu: Dispatch<SetStateAction<ReactNode>>;
}

export const ContextMenu_Context = createContext<ContextMenuProps>(
  {} as ContextMenuProps
);
