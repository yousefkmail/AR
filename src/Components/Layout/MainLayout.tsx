import Navbar from "@components/Organisms/Navbar/Navbar";
import BottomFooterLayour from "./BottomFooterLayour";
import { Outlet } from "react-router-dom";
import Footer from "@components/Organisms/Footer/Footer";

export default function MainLayout() {
  return (
    <BottomFooterLayour
      Page={
        <div
          style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}
        >
          <Navbar />
          <Outlet />
        </div>
      }
      Footer={<Footer />}
    ></BottomFooterLayour>
  );
}
