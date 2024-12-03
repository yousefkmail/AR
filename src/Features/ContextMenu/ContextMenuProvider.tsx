import { useState } from "react";
import { ContextMenu_Context } from "./ContextMenu_Context";
import { BasisPlane } from "../../Core/BasisPlane";
import { PiecePlane } from "../../Core/PiecePlane";

export const ContextMenuProvider = ({ children }: any) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [activeBasis, setActiveBasis] = useState<BasisPlane | null>(null);
  const [activePiece, setActivePiece] = useState<PiecePlane | null>(null);
  return (
    <ContextMenu_Context.Provider
      value={{
        isOpened,
        setIsOpened,
        menuPosition,
        setMenuPosition,
        activeBasis,
        setActiveBasis,
        activePiece,
        setActivePiece,
      }}
    >
      {children}
    </ContextMenu_Context.Provider>
  );
};
