import { TemplateObject } from "@core";
import { createContext } from "react";

export interface Template3DObjectContextProps {
  templateObject: TemplateObject;
}

export const Template3DObjectContext =
  createContext<Template3DObjectContextProps>(null!);
