import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FooterSocialLinkProps {
  icon: IconProp;
  link: string;
}
export default function FooterSocialLink(props: FooterSocialLinkProps) {
  return (
    <a className="footer-link" href={props.link}>
      <FontAwesomeIcon size="lg" icon={props.icon} />
    </a>
  );
}
