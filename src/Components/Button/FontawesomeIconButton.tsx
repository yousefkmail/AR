import IconButton, { IconButtonProps } from "./IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";

interface FontawesomeIconButtonProps extends IconButtonProps {
  icon: IconDefinition;
  size?: SizeProp;
}

export default function FontawesomeIconButton(
  _props: FontawesomeIconButtonProps
) {
  return (
    <IconButton {..._props}>
      <FontAwesomeIcon size={_props.size} icon={_props.icon} />
    </IconButton>
  );
}
