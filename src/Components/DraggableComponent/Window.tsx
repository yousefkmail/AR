import { Resizable } from "re-resizable";
import Draggable, { ControlPosition } from "react-draggable";
import { ResizableProps } from "re-resizable";
interface WindowProps extends Partial<ResizableProps> {
  defaultPosition?: ControlPosition;
}

export default function Window(props: WindowProps) {
  const { children, defaultPosition, ...rest } = props;
  return (
    <Draggable
      defaultPosition={defaultPosition}
      handle=".handle"
      bounds="parent"
    >
      <Resizable
        {...rest}
        style={{ position: "absolute", zIndex: 100, backgroundColor: "white" }}
        minWidth={200}
        minHeight={300}
      >
        <div style={{ width: "100%", height: "30px" }}>
          <img
            draggable={false}
            className="handle"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            src="https://cdn.icon-icons.com/icons2/2248/PNG/512/drag_horizontal_variant_icon_136679.png"
            alt="No preview"
          />
        </div>
        {children}
      </Resizable>
    </Draggable>
  );
}
