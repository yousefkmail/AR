import {
  faCircleExclamation,
  faClock,
  faRotateLeft,
  faTruck,
  faTruckRampBox,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrderStatus } from "@data/Order";
import { useRecordContext } from "react-admin";

export function OrderStatusShow() {
  const record = useRecordContext();
  const statusIcon = {
    Pending: faClock,
    Processing: faCircleExclamation,
    Shipped: faTruck,
    Delivered: faTruckRampBox,
    Cancelled: faXmark,
    Returned: faRotateLeft,
  };
  const statusColor = {
    Pending: "orange",
    Processing: "purple",
    Shipped: "blue",
    Delivered: "green",
    Cancelled: "red",
    Returned: "black",
  };

  return (
    <div
      style={{
        color: statusColor[record?.["status"] as OrderStatus],
        padding: "5px 4px",
      }}
    >
      <FontAwesomeIcon icon={statusIcon[record?.["status"] as OrderStatus]} />
      <span> {record?.["status"]}</span>
    </div>
  );
}
