import { ItemPriceField } from "./ItemPriceField";
import { ItemStockField } from "./ItemStockField";

export default function ItemStockPrice() {
  return (
    <div
      style={{
        backgroundColor: "#fafafb",
        padding: "16px 8px",
        borderRadius: "7px",
      }}
    >
      <ItemPriceField source="price" />
      <ItemStockField source="stock" />
    </div>
  );
}
