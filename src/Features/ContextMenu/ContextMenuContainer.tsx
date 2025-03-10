import FloatingContainer from "@components/Layout/FloatingContainer";
import { useObjectContextMenu } from "./Hooks/useObjectContextMenu";
import { useEffect } from "react";

export default function ContextMenuContainer() {
  const { menuPosition, menu, setMenu } = useObjectContextMenu();

  useEffect(() => {
    setMenu(null);
  }, []);
  return (
    <div className="contextMenu_container" style={{ zIndex: 5200 }}>
      <FloatingContainer posX={menuPosition.x} posY={menuPosition.y}>
        {menu}
      </FloatingContainer>
    </div>
  );
}
