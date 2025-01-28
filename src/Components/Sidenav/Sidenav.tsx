import { useNavigate } from "react-router-dom";
import FontawesomeIconButton from "../Button/FontawesomeIconButton";
import { faCartShopping, faHome } from "@fortawesome/free-solid-svg-icons";

export default function Sidenav() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 1000,
        top: "10px",
        left: "50%",
        transform: "translate(-50%,0)",
        backgroundColor: "white",
        display: "flex",
        padding: "7px",
        borderRadius: "7px",
      }}
    >
      <FontawesomeIconButton
        size="xl"
        onClick={() => navigate("/")}
        icon={faHome}
        isActive={false}
      ></FontawesomeIconButton>
      <FontawesomeIconButton
        size="xl"
        onClick={() => navigate("/cart")}
        icon={faCartShopping}
        isActive={false}
      ></FontawesomeIconButton>
    </div>
  );
}
