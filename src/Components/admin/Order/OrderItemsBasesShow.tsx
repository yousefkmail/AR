import { useRecordContext } from "react-admin";
import OrderItemShow from "./OrderItemShow";
import { CartItemType } from "Features/Cart/CartItem";
import { Basis } from "Data/Models/Basis";

export default function OrderItemsBasesShow() {
  const record = useRecordContext();
  console.log(record);
  return (
    <div>
      <h4>Bases</h4>

      <div style={{ backgroundColor: "#fafafb" }}>
        {record?.["bases"].map((item: CartItemType<Basis>) => (
          <OrderItemShow
            name={item.item.name}
            price={item.item.price}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  );
}
