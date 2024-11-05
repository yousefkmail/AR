import { useSceneSettings } from "../../Hooks/useSceneSettings";
import { MovementMode } from "../../Context/SceneSettingsContext";
import Window from "../DraggableComponent/Window";
export default function SceneSettings() {
  const { SetMovementMode, MovementMode: movementMode } = useSceneSettings();
  return (
    <Window defaultPosition={{ x: 99, y: 0 }}>
      <div>
        <div>Piece Movement Mode</div>
        <div>
          <button
            style={{
              border: "none",
            }}
            className={movementMode === MovementMode.Parent ? "active" : ""}
            onClick={() => SetMovementMode(MovementMode.Parent)}
          >
            Parent
          </button>
          <button
            style={{
              border: "none",
            }}
            className={movementMode === MovementMode.Child ? "active" : ""}
            onClick={() => SetMovementMode(MovementMode.Child)}
          >
            Child
          </button>
        </div>
      </div>
    </Window>
  );
}
