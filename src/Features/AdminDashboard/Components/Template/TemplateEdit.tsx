import { Edit, SimpleForm, TextInput } from "react-admin";
import { FirebaseImagesSelect } from "../Shared/FirebaseImagesSelect";

export function TemplateEdit() {
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
