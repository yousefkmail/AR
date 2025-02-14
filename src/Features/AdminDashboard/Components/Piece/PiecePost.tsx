import {
  SimpleForm,
  required,
  Create,
  TextInput,
  NumberInput,
  minValue,
  BooleanInput,
} from "react-admin";
import { FirebaseImagesSelect } from "../Shared/FirebaseImagesSelect";

export const PiecePost = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput validate={[required()]} source="name" />
        <TextInput validate={[required()]} source="description" />
        <NumberInput validate={[required(), minValue(0)]} source="price" />
        <NumberInput validate={[required(), minValue(0)]} source="stock" />
        <NumberInput validate={[required(), minValue(1)]} source="height" />
        <NumberInput validate={[required(), minValue(1)]} source="width" />
        <NumberInput validate={[required(), minValue(0)]} source="baseWidth" />
        <NumberInput validate={[required(), minValue(0)]} source="baseOffset" />
        <TextInput validate={[required()]} source="category" />
        <BooleanInput validate={[required()]} source="isFlipable" />
        <FirebaseImagesSelect collection="pieces" source="previewImage" />
      </SimpleForm>
    </Create>
  );
};
