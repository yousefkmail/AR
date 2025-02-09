import {
  faCircleExclamation,
  faClock,
  faRotateLeft,
  faTruck,
  faTruckRampBox,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrderStatus } from "Data/Models/Order";
import { useRecordContext } from "react-admin";

export default function OrderStatusShow() {
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
    Processing: "yellow",
    Shipped: "blue",
    Delivered: "green",
    Cancelled: "red",
    Returned: "black",
  };

  return (
    <div style={{ color: statusColor[record?.["status"] as OrderStatus] }}>
      <FontAwesomeIcon icon={statusIcon[record?.["status"] as OrderStatus]} />
      <span> {record?.["status"]}</span>
    </div>
  );
}
