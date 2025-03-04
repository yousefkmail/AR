import {
  Datagrid,
  DateField,
  FunctionField,
  List,
  TextField,
} from "react-admin";
import { PriceField } from "../Shared/PriceField";

const formatPascalCase = (value: string) => {
  return value.replace(/([A-Z])/g, " $1").trim();
};

export const OrderList = () => (
  <List>
    <Datagrid>
      <TextField source="customer.name" />
      <FunctionField
        source="type"
        render={(record) => formatPascalCase(record.type)}
      />
      <FunctionField
        source="paymentStatus"
        render={(record) => formatPascalCase(record.paymentStatus)}
      />
      <FunctionField
        source="paymentType"
        render={(record) => formatPascalCase(record.paymentType)}
      />
      <PriceField source="productsPrice" />
      <FunctionField
        source="status"
        render={(record) => formatPascalCase(record.status)}
      />
      <FunctionField
        source="shippingType"
        render={(record) => formatPascalCase(record.shippingType)}
      />
      <PriceField source="totalPrice" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);
