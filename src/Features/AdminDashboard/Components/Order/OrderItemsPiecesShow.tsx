import { useRecordContext } from "react-admin";
import { OrderItemShow } from "./OrderItemShow";
import { Piece } from "Core/Models/Piece";
import { CartItemType } from "@features/Cart/Models/CartItemType";

export function OrderItemsPiecesShow() {
  const record = useRecordContext();
  return (
    <div>
      <h4>Pieces</h4>

      <div style={{ backgroundColor: "#fafafb" }}>
        {record?.["pieces"].map((item: CartItemType<Piece>) => (
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
