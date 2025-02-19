export const EmptyCartMessage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <img
        style={{ maxWidth: "min(500px,100%)", aspectRatio: "1/1" }}
        src="./3-2-cart-png-hd.png"
        alt="Empty Cart"
      />
      <h1>You don't have any items in your cart.</h1>
      <h3>Start by building your collection and adding it to your cart.</h3>
    </div>
  );
};
