import { useState } from "react";
import {
  Button,
  useUpdate,
  useNotify,
  useRefresh,
  useRecordContext,
  Confirm,
  EditButton,
} from "react-admin";

const statusStyles: Record<string, React.CSSProperties> = {
  Processing: { backgroundColor: "#007bff", color: "white" }, // Blue
  Shipped: { backgroundColor: "#ff9800", color: "white" }, // Orange
  Delivered: { backgroundColor: "#4caf50", color: "white" }, // Green
  Cancelled: { backgroundColor: "#f44336", color: "white" }, // Red
};

const UpdateOrderStatusButton = ({ status }: { status: string }) => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const [update, { isPending }] = useUpdate();

  const [open, setOpen] = useState(false);

  if (!record) return null;
  const handleClick = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const handleConfirm = () => {
    update(
      "orders",
      { id: record.id, data: { status } },
      {
        onSuccess: () => {
          notify(`Order status updated to ${status}`, { type: "success" });
          refresh();
        },
        onError: (error) => {
          notify(`Error: ${error.message}`, { type: "error" });
        },
      }
    );
    setOpen(false);
  };

  return (
    <>
      <Button
        style={{ ...statusStyles[status], margin: "5px" }}
        label={status}
        onClick={handleClick}
      />
      <Confirm
        isOpen={open}
        loading={isPending}
        title=""
        content={`Are you sure you want to update order status to ${status}?`}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
};

export const OrderShowActions = () => (
  <>
    <UpdateOrderStatusButton status="Processing" />
    <UpdateOrderStatusButton status="Shipped" />
    <UpdateOrderStatusButton status="Delivered" />
    <UpdateOrderStatusButton status="Cancelled" />
    <EditButton />
  </>
);
