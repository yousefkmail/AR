import { ChangeEvent, useState } from "react";
import FloatingContainer from "../../Components/FloatingContainer/FloatingContainer";
import { Slider } from "@mui/material";
import {
  faTrash,
  faRotate,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface ObjectContextMenuProps {
  posX: number;
  posY: number;
  OnDelete: () => void;
  OnRotationChangd: (number: number) => void;
  onAddToCartPressed: () => void;
  RotationValue: number;
}
export default function BasisContextMenu({
  posX,
  posY,
  OnRotationChangd,
  OnDelete,
  RotationValue,
  onAddToCartPressed,
}: Partial<ObjectContextMenuProps>) {
  const RotationChanged = (_event: Event, value: number | number[]) => {
    OnRotationChangd?.(value as number);
  };

  const [isRotationOpened, setIsRotationOpened] = useState<boolean>(false);
  function handleInputValue(event: ChangeEvent<HTMLInputElement>): void {
    OnRotationChangd?.(parseInt(event.target.value));
  }

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
            width: "300px",
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
          <button
            className={"contextmenu-button"}
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
          <button className={"contextmenu-button"} onClick={() => OnDelete?.()}>
            <div style={{ marginBottom: "5px" }}>
              <FontAwesomeIcon
                style={{ marginBottom: "3px" }}
                size="xl"
                icon={faTrash}
              />
            </div>
            Delete
          </button>
          <button
            className={"contextmenu-button"}
            onClick={() => onAddToCartPressed?.()}
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
