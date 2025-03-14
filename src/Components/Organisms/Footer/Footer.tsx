import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faSignIn } from "@fortawesome/free-solid-svg-icons";
import FooterSocialLink from "./FooterSocialLink";
import { useGlobalSettings } from "../../../Hooks/useGlobalSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Footer() {
  const { data, isLoading } = useGlobalSettings();

  const year = new Date().getFullYear();

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
          <a className="footer-link" href="/admin-login">
            <FontAwesomeIcon size="lg" icon={faSignIn} />
          </a>
        </div>
        <div className="footer_bottom">
          <p>{`© ${year} Wigitsco. All rights reserved.`}</p>
        </div>
      </div>
    )
  );
}
