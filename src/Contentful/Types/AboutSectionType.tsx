import { EntryFieldTypes } from "contentful";

export interface AboutSectionType {
  contentTypeId: "aboutSection";

  fields: {
    order: EntryFieldTypes.Number;
    label: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    previewImage: EntryFieldTypes.AssetLink;
    leftDirection: EntryFieldTypes.Boolean;
    id: string;
    grayBackground: EntryFieldTypes.Boolean;
  };
}
