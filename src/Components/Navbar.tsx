import { NavLink, useNavigate } from "react-router-dom";
import { faPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import IconedNavlink from "./Button/IconedNavlink";
import FontawesomeIconButton from "./Button/FontawesomeIconButton";
import PageWidthLayout from "../Layout/PageWidthLayout";
export default function () {
  const navigate = useNavigate();
  return (
    <header className="header">
      <PageWidthLayout maxWidth={1600}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "1600px",
              alignItems: "center",
              flexGrow: "1",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <NavLink
                style={{ backgroundColor: "transparent", marginRight: "20px" }}
                to={"/"}
              >
                <img
                  style={{ width: "150px", objectFit: "contain" }}
                  src="/Logo.png"
                />
              </NavLink>
            </div>

            <div
              style={{
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", marginRight: "45px" }}>
                <FontawesomeIconButton
                  size="xl"
                  isActive={false}
                  icon={faHeart}
                ></FontawesomeIconButton>
                <FontawesomeIconButton
                  size="xl"
                  onClick={() => navigate("/cart")}
                  isActive={false}
                  icon={faShoppingCart}
                ></FontawesomeIconButton>
              </div>

              <IconedNavlink
                content="Start creating"
                to={"/3D_builder"}
                icon={<IconedNavlink.FontawesomeNavlinkIcon icon={faPlus} />}
              />
            </div>
          </div>
        </div>
      </PageWidthLayout>
    </header>
  );
}
