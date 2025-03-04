import { useThree } from "@react-three/fiber";

type DragHandler = (position: [number, number, number]) => void;
type DropHandler = (event: MouseEvent) => void;

export const use3DDrag = (onDrag?: DragHandler, onDrop?: DropHandler) => {
  const { size, viewport } = useThree();

  const startDrag = () => {
    document.addEventListener("mousemove", handlePointerMove);
    document.addEventListener("mouseup", endDrag);
  };

  const endDrag = (event: MouseEvent) => {
    document.removeEventListener("mousemove", handlePointerMove);
    document.removeEventListener("mouseup", endDrag);
    onDrop?.(event);
  };

  const handlePointerMove = (event: any) => {
    const { offsetX, offsetY } = event;
    const x = (offsetX / size.width) * viewport.width - viewport.width / 2;
    const y = -(offsetY / size.height) * viewport.height + viewport.height / 2;

    const newPosition: [number, number, number] = [x, y, 0];
    if (onDrag) onDrag(newPosition);
  };

  return {
    events: {
      onPointerDown: startDrag,
    },
  };
};
