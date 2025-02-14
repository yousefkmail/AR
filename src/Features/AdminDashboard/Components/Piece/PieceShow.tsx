import { Show } from "react-admin";
import { ItemNameField } from "../Shared/item/ItemNameField";
import { ItemDescriptionField } from "../Shared/item/ItemDescriptionField";
import { ItemImageField } from "../Shared/item/ItemImageField";
import { ItemStockPrice } from "../Shared/item/ItemStockPrice";
import { PieceItemSpecifications } from "../Shared/item/PieceItem/PieceItemSpecifications";
import { PieceItemAdditionalDetails } from "../Shared/item/PieceItem/PieceItemAdditionalDetails";

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
