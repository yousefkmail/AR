import { TemplateData } from "../../Contentful/Types/TemplateType";
import { Basis } from "./BasisModel";
import { Piece } from "./PieceModel";
import { ProductItem } from "./ProductItem";

interface BasisChild {
  data: Piece;
  position: [number, number, number];
  layer: number;
}

export interface TemplateDataModel {
  basis: Basis;
  children: BasisChild[];
}

export class TemplateModel extends ProductItem {
  tags: string[] = [];
  data: TemplateData | undefined;
  loadedData?: TemplateDataModel;
}
