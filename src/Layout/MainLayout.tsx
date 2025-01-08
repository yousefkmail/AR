import BottomFooterLayour from "./BottomFooterLayour";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

export default function MainLayout() {
  return (
    <BottomFooterLayour
      Page={
        <div>
          <Navbar />
          <Outlet />
        </div>
      }
      Footer={<Footer />}
    ></BottomFooterLayour>
  );
}
