import Draggable from "react-draggable";
import { useSceneSettings } from "../../Hooks/useSceneSettings";
import { MovementMode } from "../../Context/SceneSettingsContext";

export default function SceneSettings() {
  const { SetMovementMode, MovementMode: movementMode } = useSceneSettings();
  return (
    <Draggable
      handle=".handle"
      bounds={"parent"}
      defaultPosition={{ x: 99, y: 0 }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: "100",
          backgroundColor: "#f2f0ef",
          borderRadius: "15px",
          overflow: "hidden",
          padding: "15px",
          width: "200px",
        }}
      >
        <div>
          <img
            draggable={false}
            className="handle"
            style={{
              width: "100%",
              height: "30px",
              objectFit: "contain",
            }}
            src="https://cdn.icon-icons.com/icons2/2248/PNG/512/drag_horizontal_variant_icon_136679.png"
            alt=""
          />
        </div>

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
      </div>
    </Draggable>
  );
}
