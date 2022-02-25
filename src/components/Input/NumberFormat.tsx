import React from "react";
import ReactNumberFormat from "react-number-format";
import { useController } from "react-hook-form";
import { IInput } from "./Input";

export const NumberFormat = <TFormValues extends Record<string, unknown>>(
  props: IInput.INumberFormatProps<TFormValues>
) => {
  const {
    field: { value, ...field },
    fieldState: { invalid, error },
  } = useController(props);

  return (
    <ReactNumberFormat<{ [key: string]: any }>
      {...field}
      {...props}
      error={invalid}
      helperText={error?.message || props.helperText}
    />
  );
};
