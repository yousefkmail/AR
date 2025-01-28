import { CartItem } from "../../Features/Cart/CartItem";
import { Basis } from "./BasisModel";
import { Customer } from "./Customer";
import { Piece } from "./PieceModel";

export interface Order {
  id: string;
  customer: Customer;
  shippingType: "Local" | "Global";
  paymentType: "Online" | "OnReceipt";
  paymentStatus: "Paid" | "NotPaid";
  status:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "Returned";
  bases: CartItem<Basis>[];
  pieces: CartItem<Piece>[];
  totalPrice: number;
  productsPrice: number;
}
