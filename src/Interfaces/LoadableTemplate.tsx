import { TemplateModel } from "../DataService/Models/TemplateModel";

export interface LoadableTemplate {
  template: TemplateModel;
  isLoading: boolean;
}
