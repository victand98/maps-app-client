import { TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";
import ReactNumberFormat from "react-number-format";
import { IInput } from "./Input";

export const NumberFormat = <TFormValues extends Record<string, unknown>>(
  props: IInput.INumberFormatProps<TFormValues>
) => {
  const { shouldUnregister, withHelpers = true, ...rest } = props;
  const {
    field: { value, ...field },
    fieldState: { invalid, error },
  } = useController({ shouldUnregister, ...rest });

  let otherProps = {};
  if (withHelpers)
    otherProps = {
      helperText: error?.message || props.helperText,
    };

  return (
    <ReactNumberFormat<{ [key: string]: any }>
      {...field}
      value={value as string | number | null | undefined}
      {...rest}
      error={invalid}
      {...otherProps}
      customInput={TextField as any}
    />
  );
};
