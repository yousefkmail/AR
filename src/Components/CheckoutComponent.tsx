import { useEffect } from "react";
import {
  loadCheckoutWebComponents,
  PaymentSessionResponse,
} from "@checkout.com/checkout-web-components";
import { useNavigate } from "react-router-dom";

interface PaymentcomponentProps {
  paymentSession: PaymentSessionResponse;
}

const PaymentComponent = ({ paymentSession }: PaymentcomponentProps) => {
  const navigate = useNavigate();
  const createPaymentSession = async () => {
    // Insert your public key here
    const PUBLIC_KEY = "pk_sbox_ku3x4zoqxe2zrszlrbnf2mgbpqx";

    try {
      const checkout = await loadCheckoutWebComponents({
        publicKey: PUBLIC_KEY,
        environment: "production",
        locale: "en-GB",
        paymentSession: paymentSession,

        onPaymentCompleted: (_component, _paymentResponse) => {
          navigate("/order-purchase-success");
        },
        onChange: (component) => {
          console.log(
            `onChange() -> isValid: "${component.isValid()}" for "${
              component.type
            }"`
          );
        },
        onError: (component, error) => {
          console.log("onError", error, "Component", component.type);
        },
      });

      const flowComponent = checkout.create("flow");
      const element = document.getElementById("flow-container");
      if (element) flowComponent.mount(element);
    } catch (error) {
      console.error("Error creating payment session", error);
    }
  };

  useEffect(() => {
    createPaymentSession();

    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get("status");
    const paymentId = urlParams.get("cko-payment-id");

    if (paymentId) {
      console.log("Create Payment with PaymentId: ", paymentId);
    }
  }, []); // Empty dependency array to run only once

  return (
    <div>
      <div id="flow-container"></div>
    </div>
  );
};

export default PaymentComponent;
