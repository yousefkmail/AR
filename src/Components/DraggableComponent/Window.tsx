import { Resizable } from "re-resizable";
import Draggable, { ControlPosition } from "react-draggable";
import { ResizableProps } from "re-resizable";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CenterLayout from "../../Layout/CenterLayout";
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
        style={{
          position: "absolute",
          zIndex: "var(--z-index-modal)",
          backgroundColor: "#333436",
        }}
        minWidth={200}
        minHeight={300}
      >
        <div className="handle" style={{ width: "100%", height: "30px" }}>
          <CenterLayout>
            <FontAwesomeIcon
              size="lg"
              style={{ margin: "10px" }}
              color="white"
              icon={faGripLines}
            />
          </CenterLayout>
        </div>
        {children}
      </Resizable>
    </Draggable>
  );
}
