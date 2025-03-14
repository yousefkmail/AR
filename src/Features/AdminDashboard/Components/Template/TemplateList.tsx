import {
  Datagrid,
  DeleteButton,
  ImageField,
  List,
  TextField,
} from "react-admin";
import { PriceField } from "../Shared/PriceField";
import { DateField } from "../Shared/DateField";

export function TemplateList() {
  return (
    <List>
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <ImageField source="previewImage" />
        <PriceField source="price" />
        <TextField source="description" />
        <DateField source="createdAt" />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
