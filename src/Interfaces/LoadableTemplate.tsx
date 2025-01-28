import {
  TemplateModel,
  UnresolvedTemplateModel,
} from "../DataService/Models/TemplateModel";

export enum TemplateState {
  NotLoaded,
  Loading,
  Loaded,
}

export interface LoadableTemplate {
  template: UnresolvedTemplateModel | TemplateModel;
  state: TemplateState;
}
