import { TemplateModel } from "../TemplateModel";

export interface TemplateObject {
  templateModel: TemplateModel;
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}
