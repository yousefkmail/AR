import { Entry, EntryFieldTypes } from "contentful";
import { PieceType } from "./PieceeType";

export type TemplateData = {
  baseAssetId: string;
  children: {
    pieceId: string;
    position: [number, number, number];
    layer: number;
    data: Entry<PieceType, "WITHOUT_UNRESOLVABLE_LINKS">;
  }[];
};

export type CollectionTemplate = {
  contentTypeId: "collectionTemplate";
  fields: {
    name: EntryFieldTypes.Text;
    preview: EntryFieldTypes.AssetLink;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    price: EntryFieldTypes.Number;
    hey: EntryFieldTypes.Text;
    data: TemplateData;
  };
};
