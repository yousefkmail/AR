import { Show } from "react-admin";
import { ItemNameField } from "../Shared/item/ItemNameField";
import { ItemDescriptionField } from "../Shared/item/ItemDescriptionField";
import { ItemImageField } from "../Shared/item/ItemImageField";
import { ItemStockPrice } from "../Shared/item/ItemStockPrice";
import { BasisItemSpecificationField } from "../Shared/item/BasisItem/BasisItemSpecificationField";
import { BasisItemAdditionalDetails } from "../Shared/item/BasisItem/BasisItemAdditionalDetails";

export const BasisShow = () => (
  <Show>
    <div style={{ padding: "32px" }}>
      <ItemNameField source="name" />
      <ItemDescriptionField source="description" />
      <ItemStockPrice />
      <BasisItemSpecificationField />
      <BasisItemAdditionalDetails />
      <ItemImageField source="previewImage" />
    </div>
  </Show>
);
