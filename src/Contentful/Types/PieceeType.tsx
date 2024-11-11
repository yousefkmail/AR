import { EntryFieldTypes } from "contentful";
import { BasisType } from "./BasisType";
import { PlaneBase } from "./PlaneBase";

export interface PieceType extends PlaneBase {
  contentTypeId: "piecee";
  fields: BasisType["fields"] & {
    baseWidth: EntryFieldTypes.Number;
    baseOffset: EntryFieldTypes.Number;
    category: EntryFieldTypes.Text;
  };
}
