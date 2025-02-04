import { Datagrid, DateField, List, TextField } from "react-admin";
import PriceField from "../Components/PriceField";

export const OrderList = () => (
  <List>
    <Datagrid>
      <TextField source="customer.name" />
      <TextField source="type" />
      <TextField source="paymentStatus" />
      <TextField source="paymentType" />
      <PriceField source="productsPrice" />
      <TextField source="status" />
      <TextField source="shippingType" />
      <PriceField source="totalPrice" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);
