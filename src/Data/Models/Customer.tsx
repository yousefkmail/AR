export interface OrderInfo {
  customer: Customer;
  shippingType: "Local" | "Global";
  paymentType: "Online" | "OnReceipt";
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: {
    country: string;
    city: string;
    street: string;
    ZIPCode: string;
    houseNo: string;
  };
}
