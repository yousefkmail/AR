import { useRecordContext } from "react-admin";
import {
  GetCurrencyFormat,
  CalculatePrice,
} from "../../../../Utils/CurrencyUtils";

export const ItemPriceField = ({ source }: { source: string }) => {
  const record = useRecordContext();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>Price:</div>
      <div style={{ fontSize: "1.5rem", color: "green" }}>
        {GetCurrencyFormat(CalculatePrice(record?.[source], 1))}
      </div>
    </div>
  );
};
