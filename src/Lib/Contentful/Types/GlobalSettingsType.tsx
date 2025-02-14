import { EntryFieldTypes } from "contentful";

export interface GlobalSettingsType {
  contentTypeId: "globalSettings";

  fields: {
    logo: EntryFieldTypes.AssetLink;
    siteName: EntryFieldTypes.Text;
    preview: EntryFieldTypes.AssetLink;
  };
}
