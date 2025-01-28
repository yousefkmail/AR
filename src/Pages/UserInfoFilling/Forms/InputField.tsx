import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface InputFieldProps extends Omit<TextFieldProps, "error"> {
  error?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ error, ...props }, ref) => {
    return (
      <TextField
        style={{ margin: "10px", minWidth: "200px", flexGrow: 1 }}
        error={!!error}
        helperText={error}
        inputRef={ref} // Forward the ref to the input element
        variant="outlined"
        {...props}
      />
    );
  }
);

export default InputField;
