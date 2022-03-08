import React from "react";
import ReactNumberFormat from "react-number-format";
import { useController } from "react-hook-form";
import { IInput } from "./Input";

export const NumberFormat = <TFormValues extends Record<string, unknown>>(
  props: IInput.INumberFormatProps<TFormValues>
) => {
  const { shouldUnregister, ...rest } = props;
  const {
    field: { value, ...field },
    fieldState: { invalid, error },
  } = useController({ shouldUnregister, ...rest });

  return (
    <ReactNumberFormat<{ [key: string]: any }>
      {...field}
      {...rest}
      error={invalid}
      helperText={error?.message || props.helperText}
    />
  );
};
