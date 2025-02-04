import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderSectionField from "./OrderSectionField";
import { useRecordContext } from "react-admin";

export default function OrderCustomerShow() {
  const record = useRecordContext();
  return (
    <div
      style={{
        backgroundColor: "#fafafb",
        borderRadius: "7px",
        padding: "16px",
        margin: "10px 0",
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
          icon={faPerson}
          color="blue"
        />
        <h3>Customer Details</h3>
      </div>

      <OrderSectionField
        label="Name: "
        value={record?.["customer"]?.["name"]}
      />
      <OrderSectionField
        label="Email: "
        value={record?.["customer"]?.["email"]}
      />
      <OrderSectionField
        label="Phone: "
        value={record?.["customer"]?.["phone"]}
      />
    </div>
  );
}
