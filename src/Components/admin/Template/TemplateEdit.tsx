import { Edit, SimpleForm, TextInput } from "react-admin";
import FirebaseImagesSelect from "../Components/FirebaseImagesSelect";

export default function TemplateEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" />
        <FirebaseImagesSelect collection="templates" source="previewImage" />
      </SimpleForm>
    </Edit>
  );
}
