import { useState } from "react";
import FloatingContainer from "../../Components/FloatingContainer/FloatingContainer";
import { Slider } from "@mui/material";

interface ObjectContextMenuProps {
  posX: number;
  posY: number;
  OnDelete: () => void;
  OnRotationChangd: (number: number) => void;
}
export default function BasisContextMenu({
  posX,
  posY,
  OnRotationChangd,
  OnDelete,
}: Partial<ObjectContextMenuProps>) {
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
        </div>
      </div>
    </FloatingContainer>
  );
}
