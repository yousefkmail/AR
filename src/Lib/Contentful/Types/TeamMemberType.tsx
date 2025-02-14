import { EntryFieldTypes } from "contentful";

export interface TeamMemberType {
  contentTypeId: "teamMember";
  fields: {
    name: EntryFieldTypes.Text;
    role: EntryFieldTypes.Text;
    profilePicture: EntryFieldTypes.AssetLink;
  };
}
