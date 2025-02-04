import FontawesomeIconButton from "../../Components/Button/FontawesomeIconButton";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";
import PageWidthLayout from "../../Layout/PageWidthLayout";

export default function DashboardNav() {
  const logout = async () => {
    const auth = getAuth();

    await signOut(auth);
  };

  return (
    <PageWidthLayout maxWidth={1600}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <FontawesomeIconButton
          size="2x"
          onClick={logout}
          icon={faSignOut}
          isActive={false}
        />
      </div>
    </PageWidthLayout>
  );
}
