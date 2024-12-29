import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { ClassnameMerge } from "../../Utils/CssUtils";

interface IconedNavLinkProps extends NavLinkProps {
  icon: ReactNode;
  content: string;
}

function IconedNavlink({
  icon,
  content,
  className,
  ...rest
}: IconedNavLinkProps) {
  return (
    <NavLink
      className={ClassnameMerge(
        "btn-sec-color",
        "start-creating",
        className?.toString() ?? ""
      )}
      {...rest}
    >
      {icon}
      {content}
    </NavLink>
  );
}

const FontawesomeNavlinkIcon = ({ icon }: FontAwesomeIconProps) => {
  return <FontAwesomeIcon style={{ marginRight: "10px" }} icon={icon} />;
};

IconedNavlink.FontawesomeNavlinkIcon = FontawesomeNavlinkIcon;

export default IconedNavlink;
