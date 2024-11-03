import { EntryField, EntryFieldType, EntryFieldTypes } from "contentful";
export type Piece = {
  contentTypeId: "piece";
  fields: {
    name: EntryFieldTypes.Text;
    texture: EntryFieldTypes.AssetLink;
    width: EntryFieldTypes.Number;
    height: EntryFieldTypes.Number;
    isBase: EntryFieldTypes.Boolean;
    rotationX: EntryFieldTypes.Number;
    rotationY: EntryFieldTypes.Number;
    rotationZ: EntryFieldTypes.Number;
  };
};

export type CollectionTemplate = {
  contentTypeId: "collectionTemplate";
  fields: {
    name: EntryFieldTypes.Text;
    preview: EntryFieldTypes.AssetLink;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  };
};
