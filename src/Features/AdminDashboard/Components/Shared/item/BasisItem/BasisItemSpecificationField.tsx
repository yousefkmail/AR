import { ItemNumberField } from "../ItemNumberField";

export function BasisItemSpecificationField() {
  return (
    <div>
      <h3>Specifications</h3>
      <div style={{ display: "flex" }}>
        <ItemNumberField source="width" />
        <ItemNumberField source="height" />
      </div>
    </div>
  );
}
