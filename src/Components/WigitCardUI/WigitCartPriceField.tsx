import { CalculatePrice, GetCurrencyFormat } from "@utils/CurrencyUtils";
import WigitFieldLabel from "./WigitFieldLabel";
import WigitFieldContainer from "./WigitFieldContainer";

type WigitCardPriceFieldProps = {
  label?: string;
  price: number;
};

export default function WigitCartPriceField({
  label = "Price",
  price,
}: WigitCardPriceFieldProps) {
  return (
    <WigitFieldContainer>
      <WigitFieldLabel>{label}</WigitFieldLabel>
      <div style={{ fontSize: "1em", fontWeight: "bolder" }}>
        {GetCurrencyFormat(CalculatePrice(price))}
      </div>
    </WigitFieldContainer>
  );
}
