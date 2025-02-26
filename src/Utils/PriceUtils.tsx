import { TemplateModel } from "@core/index";

export const CalculateTemplatePrice = (template: TemplateModel) => {
  let price = 0;

  price += template.base.price;

  template.children.forEach((child) => {
    price += child.piece.price;
  });

  return price;
};
