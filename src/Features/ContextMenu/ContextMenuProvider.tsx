import { useState } from "react";
import { ContextMenu_Context } from "./ContextMenu_Context";
import { BasisPlaneViewModel } from "../../Core/Viewmodels/BasisPlaneViewModel";
import { PiecePlaneViewModel } from "../../Core/Viewmodels/PiecePlaneViewModel";

export const ContextMenuProvider = ({ children }: any) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [activeBasis, setActiveBasis] = useState<BasisPlaneViewModel | null>(
    null
  );
  const [activePiece, setActivePiece] = useState<PiecePlaneViewModel | null>(
    null
  );
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
