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
        style={{ display: "flex", flexDirection: "column" }}
        {...rest}
        className="resizable"
        minWidth={280}
        minHeight={300}
      >
        <CenterLayout className="handle" horizontal>
          <FontAwesomeIcon
            size="xl"
            style={{ margin: "10px" }}
            color="var(--color-secondary)"
            icon={faGripLines}
          />
        </CenterLayout>
        <div style={{ flexGrow: 1, overflow: "hidden" }}>{children}</div>
      </Resizable>
    </Draggable>
  );
}
