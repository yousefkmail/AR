import { Show } from "react-admin";
import { OrderShowHeader } from "./OrderShowHeader";
import { OrderCustomerShow } from "./OrderCustomerShow";
import { OrderInformationShow } from "./OrderInformationShow";
import { OrderItemsShow } from "./OrderItemsShow";
import { OrderPricingShow } from "./OrderPricingShow";
import OrderCollectionsShow from "./OrderCollectionsShow";

export const OrderShow = () => (
  <div>
    <Show actions={false}>
      <div style={{ margin: "32px" }}>
        <OrderShowHeader />
        <OrderCustomerShow />
        <OrderInformationShow />
        <OrderCollectionsShow />
        <OrderItemsShow />
        <OrderPricingShow />
      </div>
    </Show>
  </div>
);
