import { Resizable, Size } from "re-resizable";
import Draggable, { ControlPosition } from "react-draggable";
import { ResizableProps } from "re-resizable";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { MouseEvent as ME, useState } from "react";
import FontawesomeIconButton from "../Button/FontawesomeIconButton";
interface WindowProps extends Partial<ResizableProps> {
  defaultPosition?: ControlPosition;
  isShown: boolean;
  name: string;
}
export interface Window {
  GetIsShown: () => boolean;
  SetIsShown: (item: boolean) => void;
  name: string;
  defaultSize: { width: number; height: number };
}

export const Window = (props: WindowProps) => {
  const {
    children,
    defaultPosition,
    name,
    defaultSize,
    isShown,
    style,
    ...rest
  } = props;

  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [size, setSize] = useState<Size>({
    width: defaultSize?.width,
    height: defaultSize?.height,
  });

  const Minimize = (e: ME) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const handleResizeStop = (
    _e: MouseEvent | TouchEvent,
    _direction: any,
    ref: HTMLElement,
    _d: any
  ) => {
    setSize({ height: ref.style.height, width: ref.style.width });
  };

  return (
    <Draggable
      defaultPosition={defaultPosition}
      handle=".handle"
      bounds="parent"
    >
      <Resizable
        {...rest}
        className={"resizable"}
        minWidth={280}
        minHeight={isMinimized ? 40 : 300}
        onResizeStop={handleResizeStop}
        enable={
          isMinimized
            ? false
            : {
                top: false,
                right: true,
                bottom: true,
                left: false,
                topRight: false,
                bottomRight: true,
                bottomLeft: false,
                topLeft: false,
              }
        }
        defaultSize={defaultSize ?? { width: 200, height: 300 }}
        size={isMinimized ? { width: 280, height: 40 } : size}
        style={{ ...style, display: isShown ? "" : "none" }}
      >
        <div style={{ display: "flex" }}>
          <div>
            <FontawesomeIconButton
              onClick={Minimize}
              icon={faMinus}
              isActive={false}
            ></FontawesomeIconButton>
          </div>
          <div style={{ flexGrow: "1" }} className="handle"></div>
        </div>

        <div style={{ flexGrow: 1, overflow: "hidden" }}>
          {
            <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
              {!isMinimized && children}
            </div>
          }
        </div>
      </Resizable>
    </Draggable>
  );
};
