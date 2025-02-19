import FloatingContainer from "@components/FloatingContainer/FloatingContainer";
import { useObjectContextMenu } from "./Hooks/useObjectContextMenu";

export default function ContextMenuContainer() {
  const { menuPosition, menu } = useObjectContextMenu();

  return (
    <div className="contextMenu_container" style={{ zIndex: 5200 }}>
      <FloatingContainer posX={menuPosition.x} posY={menuPosition.y}>
        {menu}
      </FloatingContainer>
    </div>
  );
}
