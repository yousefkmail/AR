import { useState } from "react";
import { ContextMenu_Context } from "./ContextMenu_Context";
import { TemplateObject } from "../../Core/Template";
import { PieceObject } from "../../Core/PiecePlane";
import { PieceChild } from "../../DataService/Models/TemplateModel";

export const ContextMenuProvider = ({ children }: any) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const [activeObject, setActiveObject] = useState<
    TemplateObject | PieceObject | PieceChild | null
  >(null);

  return (
    <ContextMenu_Context.Provider
      value={{
        isOpened,
        setIsOpened,
        menuPosition,
        setMenuPosition,
        activeObject,
        setActiveObject,
      }}
    >
      {children}
    </ContextMenu_Context.Provider>
  );
};
