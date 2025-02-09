import { Show } from "react-admin";
import { ItemNameField } from "../Components/item/ItemNameField";
import { ItemDescriptionField } from "../Components/item/ItemDescriptionField";
import { ItemImageField } from "../Components/item/ItemImageField";
import ItemStockPrice from "../Components/item/ItemStockPrice";
import BasisItemSpecificationField from "../Components/item/BasisItem/BasisItemSpecificationField";
import BasisItemAdditionalDetails from "../Components/item/BasisItem/BasisItemAdditionalDetails";

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
