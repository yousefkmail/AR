import {
  Datagrid,
  DeleteButton,
  EditButton,
  ImageField,
  List,
  TextField,
} from "react-admin";
import PriceField from "../Components/PriceField";
import DateField from "../Components/DateField";

export default function TemplateList() {
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
