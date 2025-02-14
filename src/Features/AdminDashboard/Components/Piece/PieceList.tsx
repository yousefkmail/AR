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
import { DateField } from "../Shared/DateField";

export const PieceList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <ImageField source="previewImage" />
      <TextField source="description" />
      <PriceField source="price" />
      <NumberField source="stock" />
      <NumberField source="category" />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton confirmTitle="" mutationMode="optimistic" />
    </Datagrid>
  </List>
);
