import {
  Datagrid,
  DeleteButton,
  EditButton,
  ImageField,
  List,
  TextField,
} from "react-admin";
import { PriceField } from "../Shared/PriceField";
import { DateField } from "../Shared/DateField";

export function TemplateList() {
  return (
    <List>
      <Datagrid>
        <TextField source="name" />
        <ImageField source="previewImage" />
        <PriceField source="price" />
        <TextField source="description" />
        <DateField source="createdAt" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
