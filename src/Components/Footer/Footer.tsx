import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import FooterSocialLink from "./FooterSocialLink";
import { useGlobalSettings } from "../../Hooks/useGlobalSettings";
export default function Footer() {
  const { data, isLoading } = useGlobalSettings();

  return (
    !isLoading &&
    data && (
      <div className="footer">
        <div className="footer_top">
          <FooterSocialLink
            icon={faWhatsapp}
            link="https://wa.me/+970568550124"
          />
          <FooterSocialLink icon={faPhone} link="tel:+970568550124" />
        </div>
        <div className="footer_bottom">
          <p>© 2024 Wigitsco. All rights reserved.</p>
        </div>
      </div>
    )
  );
}
