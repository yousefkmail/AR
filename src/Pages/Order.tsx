import PageWidthLayout from "../Layout/PageWidthLayout";
import CheckoutForm from "../Features/Checkout/CheckoutForm";
export default function Order() {
  return (
    <PageWidthLayout maxWidth={1600}>
      <CheckoutForm />
    </PageWidthLayout>
  );
}
