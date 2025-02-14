import { ItemNumberField } from "../ItemNumberField";

export function PieceItemSpecifications() {
  return (
    <div>
      <h3>Specifications</h3>

      <div style={{ display: "flex" }}>
        <ItemNumberField source="width" />
        <ItemNumberField source="height" />
      </div>
      <div style={{ display: "flex" }}>
        <ItemNumberField source="baseWidth" />
        <ItemNumberField source="baseOffset" />
      </div>
    </div>
  );
}
