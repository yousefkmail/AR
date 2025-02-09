import { CartItem } from "../../Features/Cart/CartItem";
import { Basis } from "./Basis";
import { Customer } from "./Customer";
import { Piece } from "./Piece";
export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Returned";
export interface Order {
  id: string;
  customer: Customer;
  shippingType: "Local" | "Global";
  paymentType: "Online" | "OnReceipt";
  paymentStatus: "Paid" | "NotPaid";
  status: OrderStatus;
  bases: CartItem<Basis>[];
  pieces: CartItem<Piece>[];
  totalPrice: number;
  productsPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
