import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar";
import BottomFooterLayour from "../Layout/BottomFooterLayour";

export default function Home() {
  return (
    <BottomFooterLayour
      Page={
        <div>
          <Navbar />
        </div>
      }
      Footer={<Footer />}
    ></BottomFooterLayour>
  );
}
