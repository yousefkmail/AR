import { createTheme } from "@mui/material/styles";
import { ButtonProps } from "@mui/material/Button";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    blackTransparent: true;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", serif',
  },
  palette: {
    primary: {
      main: "#ffae00",
    },
    secondary: {
      main: "#EEEEEE",
    },
    success: {
      main: "#1c4f30",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
      variants: [
        {
          props: { variant: "blackTransparent" as ButtonProps["variant"] },
          style: {
            color: "#000000",
            backgroundColor: "transparent",
            border: "1px solid #000000",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
            "&:active": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
      ],
    },
  },
});
