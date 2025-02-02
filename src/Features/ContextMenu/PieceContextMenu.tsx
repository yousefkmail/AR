import { ChangeEvent, useState } from "react";
import Select, { SingleValue } from "react-select";
import FloatingContainer from "../../Components/FloatingContainer/FloatingContainer";
import { Slider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotate,
  faTrash,
  faPaperclip,
  faRepeat,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

export interface LayerOption {
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
  RotationValue: number;
  OnFlip: () => void;
  Flipable: boolean;
  layersOptions: LayerOption[];
  OnAddToCartPressed: () => void;
}
export default function PieceContextMenu({
  posX,
  posY,
  layer,
  OnLayerChanged,
  OnRotationChangd,
  OnDelete,
  OnDeattach,
  OnFlip,
  Flipable,
  RotationValue,
  layersOptions,
  OnAddToCartPressed,
}: Partial<ObjectContextMenuProps>) {
  const LayerChanged = (data: SingleValue<LayerOption>) => {
    if (data) OnLayerChanged?.(data.value);
  };

  const RotationChanged = (_event: Event, value: number | number[]) => {
    OnRotationChangd?.(value as number);
  };

  function handleInputValue(event: ChangeEvent<HTMLInputElement>): void {
    OnRotationChangd?.(parseInt(event.target.value));
  }

  const [isRotationOpened, setIsRotationOpened] = useState<boolean>(false);

  return (
    <FloatingContainer posX={posX} posY={posY}>
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
        >
          {isRotationOpened && (
            <div
              style={{
                backgroundColor: "white",
                display: "flex",
                padding: "0 0 0 15px",
                borderRadius: "7px",
                overflow: "hidden",
                pointerEvents: "all",
              }}
            >
              <Slider
                sx={{
                  color: "black", // Change the slider thumb and track color to black
                  "& .MuiSlider-thumb": {
                    backgroundColor: "black", // Thumb color
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: "0px 0px 0px 8px rgba(0, 0, 0, 0.16)", // Hover effect
                    },
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "black", // Track color
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#bfbfbf", // Rail color (default gray, optional)
                  },
                }}
                style={{ flexGrow: "1" }}
                onChange={RotationChanged}
                defaultValue={0}
                value={RotationValue}
                min={-180}
                max={180}
              />
              <input
                defaultValue={0}
                min={-180}
                onChange={handleInputValue}
                max={180}
                value={RotationValue}
                style={{ width: "50px", marginLeft: "27px", border: "none" }}
                type="number"
                name=""
                id=""
              />
            </div>
          )}
        </div>
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

          <button
            className="contextmenu-button"
            onClick={() => setIsRotationOpened(!isRotationOpened)}
          >
            <div style={{ marginBottom: "5px" }}>
              <FontAwesomeIcon
                style={{ marginBottom: "3px" }}
                size="xl"
                icon={faRotate}
              />
            </div>
            Rotate
          </button>
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
          <button
            className={"contextmenu-button"}
            onClick={() => OnAddToCartPressed?.()}
          >
            <div style={{ marginBottom: "5px" }}>
              <FontAwesomeIcon
                style={{ marginBottom: "3px" }}
                size="xl"
                icon={faCartShopping}
              />
            </div>
            Cart
          </button>
        </div>
      </div>
    </FloatingContainer>
  );
}
