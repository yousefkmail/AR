import { faBox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderSectionField from "./OrderSectionField";
import { useRecordContext } from "react-admin";

export default function OrderInformationShow() {
  const record = useRecordContext();
  return (
    <div
      style={{
        backgroundColor: "#fafafb",
        borderRadius: "7px",
        padding: "16px",
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
          icon={faBox}
          color="red"
        />
        <h3>Order Information</h3>
      </div>

      <OrderSectionField
        label="Shipping type: "
        value={record?.["shippingType"]}
      />
      <OrderSectionField
        label="Payment type: "
        value={record?.["paymentType"]}
      />
      <OrderSectionField
        label="Payment status: "
        value={record?.["paymentStatus"] === "NotPaid" ? "Not paid" : "Paid"}
      />
    </div>
  );
}
