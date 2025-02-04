import { useRecordContext } from "react-admin";
import { CartItem } from "../../Features/Cart/CartItem";
import OrderItemShow from "./OrderItemShow";
import { Piece } from "../../DataService/Models/PieceModel";

export default function OrderItemsPiecesShow() {
  const record = useRecordContext();
  console.log(record);
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
