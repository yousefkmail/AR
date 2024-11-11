import { EntryFieldTypes } from "contentful";

export interface PlaneBase {
  fields: {
    name: EntryFieldTypes.Text;
    texture: EntryFieldTypes.AssetLink;
    width: EntryFieldTypes.Number;
    height: EntryFieldTypes.Number;
  };
}
