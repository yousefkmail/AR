import { useRecordContext } from "react-admin";
import OrderItemShow from "./OrderItemShow";
import { Piece } from "Data/Models/Piece";
import { CartItem } from "Features/Cart/CartItem";

export default function OrderItemsPiecesShow() {
  const record = useRecordContext();
  return (
    <div>
      <h4>Pieces</h4>

      <div style={{ backgroundColor: "#fafafb" }}>
        {record?.["pieces"].map((item: CartItem<Piece>) => (
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
