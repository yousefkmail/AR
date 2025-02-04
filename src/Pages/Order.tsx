import { useQuery } from "@tanstack/react-query";
import PageWidthLayout from "../Layout/PageWidthLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PaymentComponent from "../Components/CheckoutComponent";
import { PaymentSessionResponse } from "@checkout.com/checkout-web-components";
import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../Firebase/firebaseApp";
import { Order } from "../DataService/Models/Order";
import { CalculatePrice } from "../Utils/CurrencyUtils";
import { CircularProgress } from "@mui/material";
export default function OrderPage() {
  const { id } = useParams();

  const { data: order } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const orderRef = doc(collection(firestore, "orders"), id);
      const order = await getDoc(orderRef);
      return { ...order.data(), id: order.id } as Order;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const [paymentSessions, setPaymentSession] = useState<
    PaymentSessionResponse | undefined
  >();

  const CreatePaymentSession = async () => {
    const response = await fetch(
      import.meta.env.VITE_FUNCTIION_CREATE_PAYMENT_SESSION_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: id }),
      }
    );
    const paymentSession = await response.json();
    setPaymentSession(paymentSession.paymentSession);
    if (!response.ok) {
      console.error("Error creating payment session", paymentSession);
      return;
    }
  };

  useEffect(() => {
    if (!order) return;
    CreatePaymentSession();
  }, [order]);
  return (
    order && (
      <PageWidthLayout maxWidth={1600}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              flexGrow: "1",
              padding: "20px",
              width: "50%",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Order summary</h2>

            <div
              style={{
                border: "var(--default-border)",
                borderRadius: "3px",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4> Products price:</h4>
                <h4>${CalculatePrice(order.productsPrice, 1)}</h4>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4> Shipping:</h4>
                <h4>
                  {order.shippingType === "Local"
                    ? "Kuwait local shipping  ($10)"
                    : "Global shipping (custom pricing)"}
                </h4>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4> Total price:</h4>
                <h4>${CalculatePrice(order.totalPrice, 1)}</h4>
              </div>
            </div>
          </div>

          <div style={{ flexGrow: "1", padding: "20px", width: "50%" }}>
            <h2 style={{ textAlign: "center" }}>Payment</h2>
            {paymentSessions ? (
              <PaymentComponent paymentSession={paymentSessions} />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  zIndex: 10000,
                }}
              >
                <CircularProgress />
              </div>
            )}
          </div>
        </div>
      </PageWidthLayout>
    )
  );
}
