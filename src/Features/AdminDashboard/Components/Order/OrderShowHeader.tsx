import { useRecordContext } from "react-admin";
import { OrderStatusShow } from "./OrderStatusShow";

export function OrderShowHeader() {
  const record = useRecordContext();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h2 style={{ marginBottom: "0" }}>Order Details</h2>
        <h4 style={{ marginTop: "10px" }}>{`Order ID: ${record?.["id"]}`}</h4>
      </div>
      <div>
        <OrderStatusShow />
      </div>
    </div>
  );
}
