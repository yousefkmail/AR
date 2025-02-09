import {
  TemplateModel,
  UnresolvedTemplateModel,
} from "../Data/Models/TemplateModel";

export enum TemplateState {
  NotLoaded,
  Loading,
  Loaded,
}

export interface LoadableTemplate {
  template: UnresolvedTemplateModel | TemplateModel;
  state: TemplateState;
}
