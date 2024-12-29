import { TemplateModel } from "../../../DataService/Models/TemplateModel";
import CartItem from "./CartItem";

interface TemplateCartItem {
  data: TemplateModel;
  quantity: number;
}
export default function TemplateCartItem({ data, quantity }: TemplateCartItem) {
  return (
    <div>
      <CartItem {...data} quantity={quantity} />
      {data.loadedData?.children.map((item) => (
        <CartItem {...item.data} quantity={quantity}></CartItem>
      ))}
    </div>
  );
}
