import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";
import { IInput } from "./Input";

export const RadioInput = <TFormValues extends Record<string, unknown>>(
  props: IInput.RadioInputProps<TFormValues>
) => {
  const { defaultValue, label, options, helperText, ...rest } = props;

  const {
    field: { ref, ...field },
    fieldState: { invalid, error },
  } = useController({ defaultValue, ...rest });

  return (
    <FormControl error={invalid}>
      <FormLabel id={field.name}>{label}</FormLabel>

      <RadioGroup row aria-labelledby={field.name} {...field} {...rest}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>

      <FormHelperText>{error?.message || helperText}</FormHelperText>

      {/* <TextField
        {...field}
        inputRef={ref}
        {...rest}
        error={invalid}
        helperText={error?.message || props.helperText}
      /> */}
    </FormControl>
  );
};
