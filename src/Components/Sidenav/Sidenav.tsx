import { useNavigate } from "react-router-dom";
import FontawesomeIconButton from "../Button/FontawesomeIconButton";
import { faCartShopping, faHome } from "@fortawesome/free-solid-svg-icons";

export default function Sidenav() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          position: "absolute",
          left: 0,
          zIndex: 1000,
          top: "30%",
          transform: "translate(0,-50%)",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
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
    </div>
  );
}
