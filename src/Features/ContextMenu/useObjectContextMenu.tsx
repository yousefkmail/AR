import { useContext } from "react";
import { ContextMenu_Context } from "./ContextMenu_Context";

export const useObjectContextMenu = () => {
  let { isOpened, setIsOpened, ...rest } = useContext(ContextMenu_Context);

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
    ...rest,
  };
};
