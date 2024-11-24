import { Resizable } from "re-resizable";
import Draggable, { ControlPosition } from "react-draggable";
import { ResizableProps } from "re-resizable";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CenterLayout from "../../Layout/CenterLayout";
import Spacer from "../../Layout/Spacer";

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
  const { children, defaultPosition, name, defaultSize, isShown, ...rest } =
    props;

  return (
    <Draggable
      defaultPosition={defaultPosition}
      handle=".handle"
      bounds="parent"
    >
      <Resizable
        {...rest}
        className="resizable"
        minWidth={280}
        minHeight={300}
        defaultSize={defaultSize ?? { width: 200, height: 300 }}
        style={{ display: isShown ? "" : "none" }}
      >
        <CenterLayout className="handle" horizontal>
          <Spacer margin={8}>
            <FontAwesomeIcon
              size="xl"
              color="var(--text-primary)"
              icon={faGripLines}
            />
          </Spacer>
        </CenterLayout>
        <div style={{ flexGrow: 1, overflow: "hidden" }}>
          {
            <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
              {children}
            </div>
          }
        </div>
      </Resizable>
    </Draggable>
  );
};
