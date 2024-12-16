import { TemplateData } from "../../Contentful/Types/TemplateType";
import { BasisModel } from "./BasisModel";
import { PieceModel } from "./PieceModel";

interface BasisChild {
  data: PieceModel;
  position: [number, number, number];
  layer: number;
}

export interface TemplateDataModel {
  basis: BasisModel;
  children: BasisChild[];
}

export interface TemplateModel {
  preview: string;
  price: number;
  name: string;
  tags: string[];
  assetId: string;
  data: TemplateData;
  loadedData?: TemplateDataModel;
}
