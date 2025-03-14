import {
  Edit,
  SimpleForm,
  BooleanField,
  TextInput,
  NumberInput,
} from "react-admin";
import { FirebaseImagesSelect } from "../Shared/FirebaseImagesSelect";

export const PieceEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" />
        <NumberInput source="width" />
        <NumberInput source="height" />
        <NumberInput source="price" />
        <NumberInput source="stock" />
        <TextInput source="category" />
        <NumberInput source="baseWidth" />
        <NumberInput source="baseOffset" />
        <BooleanField source="isFlipable" />
        <FirebaseImagesSelect collection="pieces" source="previewImage" />
      </SimpleForm>
    </Edit>
  );
};
