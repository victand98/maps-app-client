import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";
import { IInput } from "./Input";

export const TextInput = <TFormValues extends Record<string, unknown>>(
  props: IInput.TextInputProps<TFormValues>
) => {
  const { defaultValue, ...rest } = props;

  const {
    field: { ref, ...field },
    fieldState: { invalid, error },
  } = useController({ defaultValue, ...rest });

  return (
    <TextField
      {...field}
      inputRef={ref}
      {...rest}
      error={invalid}
      helperText={error?.message || props.helperText}
    />
  );
};
