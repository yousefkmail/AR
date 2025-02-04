import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderItemsBasesShow from "./OrderItemsBasesShow";
import OrderItemsPiecesShow from "./OrderItemsPiecesShow";

export default function OrderItemsShow() {
  return (
    <div style={{ marginTop: "16px", padding: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          size="xl"
          style={{ marginRight: "10px" }}
          icon={faFolder}
          color="orange"
        />
        <h3>Order items</h3>
      </div>
      <OrderItemsBasesShow />
      <OrderItemsPiecesShow />
    </div>
  );
}
