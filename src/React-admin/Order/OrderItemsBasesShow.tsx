import { useRecordContext } from "react-admin";
import { Basis } from "../../DataService/Models/BasisModel";
import { CartItem } from "../../Features/Cart/CartItem";
import OrderItemShow from "./OrderItemShow";

export default function OrderItemsBasesShow() {
  const record = useRecordContext();
  console.log(record);
  return (
    <div>
      <h4>Bases</h4>

      <div style={{ backgroundColor: "#fafafb" }}>
        {record?.["bases"].map((item: CartItem<Basis>) => (
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
