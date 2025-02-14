import Select, { SingleValue } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPaperclip,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";

export interface LayerOption {
  label: string;
  value: number;
}

interface ObjectContextMenuProps {
  layer: LayerOption;
  OnLayerChanged: (layer: number) => void;
  OnDelete: () => void;
  OnDeattach: () => void;
  OnFlip: () => void;
  Flipable: boolean;
  layersOptions: LayerOption[];
}
export function PieceChildContextMenu({
  layer,
  OnLayerChanged,
  OnDelete,
  OnDeattach,
  OnFlip,
  Flipable,
  layersOptions,
}: Partial<ObjectContextMenuProps>) {
  const LayerChanged = (data: SingleValue<LayerOption>) => {
    if (data) OnLayerChanged?.(data.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "30px",
          marginBottom: "20px",
          width: "317px",
        }}
      ></div>
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          padding: "0 7px",
          borderRadius: "7px",
          pointerEvents: "all",
        }}
      >
        <span style={{ padding: "10px", width: "130px" }}>
          <label
            style={{ marginBottom: "5px", display: "inline-block" }}
            htmlFor=""
          >
            Layer
          </label>
          <Select
            onChange={LayerChanged}
            options={layersOptions}
            value={layer}
          ></Select>
        </span>

        <button className="contextmenu-button" onClick={() => OnDelete?.()}>
          <div style={{ marginBottom: "5px" }}>
            <FontAwesomeIcon
              style={{ marginBottom: "3px" }}
              size="xl"
              icon={faTrash}
            />
          </div>
          Delete
        </button>
        <button className="contextmenu-button" onClick={() => OnDeattach?.()}>
          <div style={{ marginBottom: "5px" }}>
            <FontAwesomeIcon
              style={{ marginBottom: "3px" }}
              size="xl"
              icon={faPaperclip}
            />
          </div>
          Deattach
        </button>

        <button
          disabled={!Flipable}
          style={{ minWidth: "50px" }}
          className="contextmenu-button"
          onClick={() => OnFlip?.()}
        >
          <div style={{ marginBottom: "5px" }}>
            <FontAwesomeIcon
              style={{ marginBottom: "3px" }}
              size="xl"
              icon={faRepeat}
            />
          </div>
          Flip
        </button>
      </div>
    </div>
  );
}
