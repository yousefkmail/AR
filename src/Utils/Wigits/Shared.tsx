import { PieceChild, PieceObject, TemplateObject } from "@core";

export type WigitType = "TemplateObject" | "PieceChild" | "PieceObject";
export const GetWigitType: (
  obj: TemplateObject | PieceChild | PieceObject
) => WigitType = (obj) => {
  if ("templateModel" in obj) {
    return "TemplateObject";
  } else if ("layer" in obj) {
    return "PieceChild";
  } else return "PieceObject";
};
