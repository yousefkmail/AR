import { useState } from "react";
import Select, { SingleValue } from "react-select";
import FloatingContainer from "../../Components/FloatingContainer/FloatingContainer";
import { Slider } from "@mui/material";
interface ObjectContextMenuProps {
  posX: number;
  posY: number;
  OnLayerChanged: (layer: number) => void;
  OnRotationChangd: (number: number) => void;
}
export default function ObjectContextMenu({
  posX,
  posY,
  OnLayerChanged,
  OnRotationChangd,
}: Partial<ObjectContextMenuProps>) {
  interface LayerOption {
    label: string;
    value: number;
  }

  const [options, setOptions] = useState<LayerOption[]>([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
  ]);

  const LayerChanged = (data: SingleValue<LayerOption>) => {
    if (data?.value) OnLayerChanged?.(data.value);
  };

  const RotationChanged = (event: Event, value: number | number[]) => {
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
            <Select onChange={LayerChanged} options={options} />
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
        </div>
      </div>
    </FloatingContainer>
  );
}
