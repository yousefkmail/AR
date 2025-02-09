import { Show } from "react-admin";
import OrderShowHeader from "./OrderShowHeader";
import OrderCustomerShow from "./OrderCustomerShow";
import OrderInformationShow from "./OrderInformationShow";
import OrderItemsShow from "./OrderItemsShow";
import OrderPricingShow from "./OrderPricingShow";

export const OrderShow = () => (
  <Show actions={false}>
    <div style={{ margin: "32px" }}>
      <OrderShowHeader />
      <OrderCustomerShow />
      <OrderInformationShow />
      <OrderItemsShow />
      <OrderPricingShow />
    </div>
  </Show>
);
