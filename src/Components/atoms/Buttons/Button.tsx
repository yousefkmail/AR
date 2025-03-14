import {
  ButtonProps as MUIButtonProps,
  Button as MUIButton,
} from "@mui/material";

interface ButtonProps extends MUIButtonProps {}
export default function Button({ children, ...rest }: ButtonProps) {
  return <MUIButton {...rest}>{children}</MUIButton>;
}
