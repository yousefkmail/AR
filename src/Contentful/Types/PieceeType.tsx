import { EntryFieldTypes } from "contentful";
import { PlaneBase } from "./PlaneBase";

export interface PieceType extends PlaneBase {
  contentTypeId: "piecee";
  fields: PlaneBase["fields"] & {
    baseWidth: EntryFieldTypes.Number;
    baseOffset: EntryFieldTypes.Number;
    category: EntryFieldTypes.Text;
  };
}
