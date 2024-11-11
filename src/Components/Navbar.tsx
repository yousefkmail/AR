import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnity } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default function () {
  return (
    <header className="header">
      <NavLink style={{ backgroundColor: "transparent" }} to={"/"}>
        <FontAwesomeIcon size="4x" color="black" icon={faUnity} />
      </NavLink>
      <NavLink className={"start-creating"} to={"/3D_Builder"}>
        <div>
          <FontAwesomeIcon style={{ marginRight: "10px" }} icon={faPlus} />
          Start creating
        </div>
      </NavLink>
    </header>
  );
}
