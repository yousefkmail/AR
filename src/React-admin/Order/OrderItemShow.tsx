import { CalculatePrice, GetCurrencyFormat } from "../../Utils/CurrencyUtils";

export default function OrderItemShow({
  name,
  quantity,
  price,
}: {
  name: string;
  quantity: number;
  price: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <div>{name}</div>
      <div>
        <span style={{ marginRight: "20px" }}>{`Qty: ${quantity}`}</span>
        <span>{`Price: ${GetCurrencyFormat(CalculatePrice(price, 1))}`}</span>
      </div>
    </div>
  );
}
