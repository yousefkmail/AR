import { ItemNumberField } from "../ItemNumberField";

export default function PieceItemSpecifications() {
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
