import { useContextMenuStore } from "../Contexts/Store/ContextMenuStore";

export const useObjectContextMenu = () => {
  const {
    isOpened,
    menu,
    menuPosition,
    setIsOpened,
    setMenu,
    setMenuPosition,
  } = useContextMenuStore((state) => state);
  const open = () => {
    setIsOpened(true);
  };

  const close = () => {
    setIsOpened(false);
  };

  const toggleVisibility = () => {
    setIsOpened(isOpened);
  };

  return {
    open,
    close,
    toggleVisibility,
    isOpened,
    menu,
    menuPosition,
    setMenu,
    setMenuPosition,
  };
};
