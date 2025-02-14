import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecordContext } from "react-admin";
import { GetCurrencyFormat, CalculatePrice } from "@utils/CurrencyUtils";

export function OrderPricingShow() {
  const record = useRecordContext();
  return (
    <div
      style={{
        backgroundColor: "#fafafb",
        borderRadius: "7px",
        padding: "16px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          size="2x"
          style={{ marginRight: "10px" }}
          icon={faDollarSign}
          color="green"
        />
        <h3>Pricing</h3>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Products Price:</div>
        <div>
          {GetCurrencyFormat(CalculatePrice(record?.["productsPrice"], 1))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Total Price:</div>
        <div>
          {GetCurrencyFormat(CalculatePrice(record?.["totalPrice"], 1))}
        </div>
      </div>
    </div>
  );
}
