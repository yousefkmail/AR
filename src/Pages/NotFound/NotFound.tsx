import { Button } from "@components/atoms";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "48px" }}>Wigitsco.com</h1>
      </div>

      <div>
        <h2 style={{ fontSize: "120px", padding: "48px 0", margin: "0" }}>
          404
        </h2>
      </div>

      <h4>The page you requested could not be found.</h4>

      <Button
        onClick={() => navigate("/")}
        variant="blackTransparent"
        style={{ padding: "12px var(--space-sm)" }}
      >
        {"Go to home page"}
      </Button>
    </div>
  );
}
