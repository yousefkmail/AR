import { useState } from "react";
import Select, { SingleValue } from "react-select";
import FloatingContainer from "../../Components/FloatingContainer/FloatingContainer";
import { Slider } from "@mui/material";

interface LayerOption {
  label: string;
  value: number;
}

interface ObjectContextMenuProps {
  posX: number;
  posY: number;
  layer: LayerOption;
  OnLayerChanged: (layer: number) => void;
  OnRotationChangd: (number: number) => void;
  OnDelete: () => void;
  OnDeattach: () => void;
}
export default function PieceContextMenu({
  posX,
  posY,
  layer,
  OnLayerChanged,
  OnRotationChangd,
  OnDelete,
  OnDeattach,
}: Partial<ObjectContextMenuProps>) {
  const [options] = useState<LayerOption[]>([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
  ]);

  const LayerChanged = (data: SingleValue<LayerOption>) => {
    if (data?.value) OnLayerChanged?.(data.value);
  };

  const RotationChanged = (_event: Event, value: number | number[]) => {
    OnRotationChangd?.(value as number);
  };

  const [isRotationOpened, setIsRotationOpened] = useState<boolean>(false);

  return (
    <FloatingContainer posX={posX} posY={posY}>
      <div>
        <div
          style={{
            height: "50px",
            marginBottom: "20px",
          }}
        >
          {isRotationOpened && (
            <div
              style={{
                height: "100%",
                backgroundColor: "white",
                display: "flex",
              }}
            >
              <Slider
                style={{ flexGrow: "1" }}
                onChange={RotationChanged}
                defaultValue={0}
                min={-180}
                max={180}
              />
              <input
                defaultValue={0}
                min={-180}
                max={180}
                style={{ width: "40px", marginLeft: "10px" }}
                type="number"
                name=""
                id=""
              />
            </div>
          )}
        </div>
        <div style={{ backgroundColor: "white", display: "flex" }}>
          <span style={{ padding: "10px", width: "130px" }}>
            <label
              style={{ marginBottom: "5px", display: "inline-block" }}
              htmlFor=""
            >
              Layer
            </label>
            <Select onChange={LayerChanged} options={options} value={layer} />
          </span>

          <button
            onClick={() => setIsRotationOpened(!isRotationOpened)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
            }}
          >
            Rotate
          </button>
          <button onClick={() => OnDelete?.()}>Delete</button>
          <button onClick={() => OnDeattach?.()}>Deattach</button>
        </div>
      </div>
    </FloatingContainer>
  );
}
