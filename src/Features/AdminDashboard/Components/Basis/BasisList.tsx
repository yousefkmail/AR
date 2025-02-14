import {
  Datagrid,
  DeleteButton,
  EditButton,
  ImageField,
  List,
  NumberField,
  TextField,
} from "react-admin";
import { PriceField } from "../Shared/PriceField";

export const BasisList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="name" />
        <ImageField source="previewImage" />
        <TextField source="description" />
        <NumberField source="width" />
        <NumberField source="height" />
        <PriceField source="price" />
        <NumberField source="stock" />
        <EditButton />
        <DeleteButton mutationMode="optimistic" confirmTitle="" />
      </Datagrid>
    </List>
  );
};
