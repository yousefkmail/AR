import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar";
import PremadeTemplates from "../Components/PremadeTemplates/PremadeTemplates";
import BottomFooterLayour from "../Layout/BottomFooterLayour";

export default function Home() {
  return (
    <BottomFooterLayour
      Page={
        <div>
          <Navbar />
          <PremadeTemplates />
        </div>
      }
      Footer={<Footer />}
    ></BottomFooterLayour>
  );
}
