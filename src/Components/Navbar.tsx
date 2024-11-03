import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnity } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
export default function () {
  return (
    <header className="header">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <FontAwesomeIcon size="4x" color="black" icon={faUnity} />
        <NavLink to={"/3D_Builder"}>Start building</NavLink>
      </div>
    </header>
  );
}
