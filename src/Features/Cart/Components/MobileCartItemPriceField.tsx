import { GetCurrencyFormat } from "@utils/CurrencyUtils";

interface MobileCartItemPriceFieldProps {
  price: number;
  label: string;
}
export default function MobileCartItemPriceField({
  label,
  price,
}: MobileCartItemPriceFieldProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p>{label}</p>
      <p style={{ padding: "7px", fontWeight: "bolder" }}>
        {GetCurrencyFormat(price)}
      </p>
    </div>
  );
}
