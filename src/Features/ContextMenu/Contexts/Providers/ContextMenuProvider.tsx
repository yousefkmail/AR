import { ReactNode, useState } from "react";
import { ContextMenu_Context } from "../ContextMenu_Context";
import FloatingContainer from "../../../../Components/FloatingContainer/FloatingContainer";

export const ContextMenuProvider = ({ children }: any) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menu, setMenu] = useState<ReactNode | null>();

  return (
    <ContextMenu_Context.Provider
      value={{
        isOpened,
        setIsOpened,
        menuPosition,
        setMenuPosition,
        setMenu,
      }}
    >
      <>
        {children}
        <div className="contextMenu_container" style={{ zIndex: 5200 }}>
          <FloatingContainer posX={menuPosition.x} posY={menuPosition.y}>
            {menu}
          </FloatingContainer>
        </div>
      </>
    </ContextMenu_Context.Provider>
  );
};
