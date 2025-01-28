import { createContext, Dispatch, SetStateAction } from "react";
import { TemplateObject } from "../../Core/Template";
import { PieceObject } from "../../Core/PiecePlane";
import { PieceChild } from "../../DataService/Models/TemplateModel";

interface ContextMenuProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  menuPosition: { x: number; y: number };
  setMenuPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  activeObject: TemplateObject | PieceObject | PieceChild | null;
  setActiveObject: Dispatch<
    SetStateAction<TemplateObject | PieceObject | PieceChild | null>
  >;
}

export const ContextMenu_Context = createContext<ContextMenuProps>(
  {} as ContextMenuProps
);
