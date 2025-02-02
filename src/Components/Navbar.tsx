import { NavLink, useNavigate } from "react-router-dom";
import {
  faBars,
  faCaretRight,
  faPlus,
  faShoppingCart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import IconedNavlink from "./Button/IconedNavlink";
import FontawesomeIconButton from "./Button/FontawesomeIconButton";
import PageWidthLayout from "../Layout/PageWidthLayout";
import { useGlobalSettings } from "../Hooks/useGlobalSettings";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGlobalSettings();

  const [isMobileNavOpened, setIsMobileNavOpened] = useState<boolean>(false);

  return !isLoading && data ? (
    <nav className="header">
      <PageWidthLayout maxWidth={1600}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexGrow: "1",
          }}
        >
          <NavLink
            style={{
              backgroundColor: "transparent",
            }}
            to={"/"}
          >
            <img
              style={{ width: "150px", objectFit: "contain" }}
              src={data?.logo}
              alt="Logo"
            />
          </NavLink>

          <div className="header__right">
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
          <div className="header__hamburger">
            <FontawesomeIconButton
              onClick={() => setIsMobileNavOpened(!isMobileNavOpened)}
              isActive={false}
              icon={faBars}
              size="2x"
            />
          </div>
        </div>
      </PageWidthLayout>
      <div
        onScroll={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          zIndex: "1000",
          top: 0,
          right: 0,
          width: 0,
          height: 0,
        }}
      >
        {isMobileNavOpened && (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              position: "fixed",
              top: 0,
              right: 0,
              backgroundColor: "rgba(100, 100, 100, 0.27)",
            }}
          ></div>
        )}
        <div
          className={
            "mobile-nav " + (isMobileNavOpened ? "" : "mobile-nav-closed")
          }
        >
          <div style={{ marginBottom: "20px" }}>
            <FontawesomeIconButton
              icon={faXmark}
              isActive={false}
              size="2x"
              onClick={() => setIsMobileNavOpened(false)}
            ></FontawesomeIconButton>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <NavLink
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                padding: "8px 0",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              to={"/"}
            >
              <p style={{ margin: "0" }}>Home</p>
              <FontAwesomeIcon icon={faCaretRight} />
            </NavLink>
            <NavLink
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                padding: "8px 0",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              to={"/3D_builder"}
            >
              <p style={{ margin: "0" }}>3D builder</p>
              <FontAwesomeIcon icon={faCaretRight} />
            </NavLink>
            <NavLink
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                padding: "8px 0",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              to={"/cart"}
            >
              <p style={{ margin: "0" }}>cart</p>
              <FontAwesomeIcon icon={faCaretRight} />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <>
      <nav className="header desktop-nav-skeleton">
        <PageWidthLayout maxWidth={1600}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexGrow: "1",
            }}
          >
            <div style={{ margin: "10px 0" }}>
              <Skeleton width={150} height={53} />
            </div>

            <div style={{ display: "flex" }}>
              <div
                style={{
                  marginRight: "50px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Skeleton
                  width={30}
                  height={30}
                  style={{ marginRight: "15px" }}
                />
                <Skeleton width={30} height={30} />
              </div>

              <Skeleton width={167} height={53} />
            </div>
          </div>
        </PageWidthLayout>
      </nav>

      <nav className="header mobile-nav-skeleton">
        <PageWidthLayout maxWidth={1600}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexGrow: "1",
            }}
          >
            <div style={{ margin: "10px 0" }}>
              <Skeleton width={150} height={53} />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "7px",
              }}
            >
              <Skeleton width={30} height={30} />
            </div>
          </div>
        </PageWidthLayout>
      </nav>
    </>
  );
}
