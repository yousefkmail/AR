import TwoImagesComparer from "@components/Mollecules/TwoImagesComparer/TwoImagesComparer";
import { AboutSections } from "./AboutSections";
import { TeamMembers } from "./TeamMembers";

export default function Home() {
  return (
    <div className="pt-sm">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "16px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: "32px" }}>Build your own decoration.</h2>
        <div
          style={{
            width: "616px",
            height: "316px",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
            padding: "8px",
          }}
        >
          <TwoImagesComparer
            afterImageSrc="/screenshot (4).png"
            beforeImageSrc="/screenshot (3).png"
          />
        </div>
      </div>

      <AboutSections />
      <TeamMembers />
    </div>
  );
}
