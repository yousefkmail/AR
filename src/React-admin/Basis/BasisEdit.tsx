import {
  ArrayInput,
  Edit,
  minValue,
  NumberInput,
  required,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

import FirebaseImagesSelect from "../Components/FirebaseImagesSelect";
export default function BasisEdit() {
  const validateMinOneItem = (value: any) =>
    !value || value.length === 0 ? "At least one layer is required" : undefined;

  return (
    <Edit>
      <SimpleForm>
        <TextInput validate={[required()]} source="name" />
        <TextInput validate={[required()]} source="description" />
        <NumberInput validate={[required(), minValue(0)]} source="price" />
        <NumberInput validate={[required(), minValue(0)]} source="stock" />
        <NumberInput validate={[required(), minValue(1)]} source="height" />
        <NumberInput validate={[required(), minValue(1)]} source="width" />
        <FirebaseImagesSelect collection="bases" source="previewImage" />

        <ArrayInput source="layers" validate={[validateMinOneItem]}>
          <SimpleFormIterator>
            <TextInput source="name" label="Layer Name" />
            <NumberInput source="positionOffset" label="Position Offset" />
            <NumberInput source="width" label="Layer Width" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
}
