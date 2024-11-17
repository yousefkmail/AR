import { useState } from "react";
import { ContextMenu_Context } from "./ContextMenu_Context";

export const ContextMenuProvider = ({ children }: any) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [managedId, setManagedId] = useState<number>(-1);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  return (
    <ContextMenu_Context.Provider
      value={{
        isOpened,
        setIsOpened,
        managedId,
        setManagedId,
        menuPosition,
        setMenuPosition,
      }}
    >
      {children}
    </ContextMenu_Context.Provider>
  );
};
