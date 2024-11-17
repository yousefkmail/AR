import { useSceneSettings } from "../../Hooks/useSceneSettings";
import { MovementMode } from "../../Context/SceneSettingsContext";
import Window from "../DraggableComponent/Window";
import Spacer from "../../Layout/Spacer";

export default function SceneSettings({ TakeScreenshot }: any) {
  const { SetMovementMode, movementMode } = useSceneSettings();

  return (
    <Window defaultPosition={{ x: 1000, y: 0 }}>
      <Spacer padding={10}>
        <div>Piece Movement Mode</div>
        <br />
        <div className="flex">
          <button
            style={{
              flexGrow: "1",
              border: "var(--default-border)",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
            className={
              movementMode === MovementMode.Parent
                ? "settings-movemode-button-active"
                : ""
            }
            onClick={() => SetMovementMode(MovementMode.Parent)}
          >
            <Spacer padding={7}>Parent</Spacer>
          </button>
          <button
            style={{
              flexGrow: "1",
              border: "var(--default-border)",

              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
            className={
              movementMode === MovementMode.Child
                ? "settings-movemode-button-active"
                : ""
            }
            onClick={() => SetMovementMode(MovementMode.Child)}
          >
            <Spacer padding={7}>Child</Spacer>
          </button>
        </div>
        <br />
        <button
          onClick={() => TakeScreenshot()}
          style={{
            display: "block",
            width: "100%",
            borderRadius: "7px",
            border: "var(--default-border)",
          }}
        >
          <Spacer padding={7}>Screenshot</Spacer>
        </button>
      </Spacer>
    </Window>
  );
}
