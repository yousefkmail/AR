import { EntryFieldTypes } from "contentful";

export type CollectionTemplate = {
  contentTypeId: "collectionTemplate";
  fields: {
    name: EntryFieldTypes.Text;
    preview: EntryFieldTypes.AssetLink;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    price: EntryFieldTypes.Number;
  };
};
