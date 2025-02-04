import { Show } from "react-admin";
import { ItemNameField } from "../Components/item/ItemNameField";
import { ItemDescriptionField } from "../Components/item/ItemDescriptionField";
import { ItemImageField } from "../Components/item/ItemImageField";
import ItemStockPrice from "../Components/item/ItemStockPrice";
import PieceItemSpecifications from "../Components/item/PieceItem/PieceItemSpecifications";
import PieceItemAdditionalDetails from "../Components/item/PieceItem/PieceItemAdditionalDetails";

export const PieceShow = () => (
  <Show>
    <div style={{ margin: "32px" }}>
      <ItemNameField source="name" />
      <ItemDescriptionField source="description" />
      <ItemStockPrice />
      <PieceItemSpecifications />
      <PieceItemAdditionalDetails />
      <ItemImageField source="previewImage" />
    </div>
  </Show>
);
