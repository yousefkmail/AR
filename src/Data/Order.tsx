import { CartItemType } from "../Features/Cart/Models/CartItemType";
import { Basis } from "../Core/Models/Basis";
import { Customer } from "./Customer";
import { Piece } from "../Core/Models/Piece";
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
  bases: CartItemType<Basis>[];
  pieces: CartItemType<Piece>[];
  totalPrice: number;
  productsPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
