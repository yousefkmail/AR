import { useQuery } from "@tanstack/react-query";
import PageWidthLayout from "../Layout/PageWidthLayout";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import PaymentComponent from "../Components/CheckoutComponent";
import { PaymentSessionResponse } from "@checkout.com/checkout-web-components";
import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../Firebase/firebaseApp";
import { Order } from "../DataService/Models/Order";
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

  return (
    order && (
      <PageWidthLayout maxWidth={1600}>
        <h1 style={{ textAlign: "center" }}>Your order</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3> Order id:</h3>
          <h3>{order.id}</h3>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3> Total price:</h3>
          <h3>{order.totalPrice / 100}$</h3>
        </div>

        <Button
          onClick={() => {
            CreatePaymentSession();
          }}
          variant="outlined"
        >
          CHECKOUT
        </Button>
        {paymentSessions && (
          <PaymentComponent paymentSession={paymentSessions} />
        )}
      </PageWidthLayout>
    )
  );
}
