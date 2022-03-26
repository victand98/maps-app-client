import { TimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { IInput } from "./Input";

export const TimeInput = <TFormValues extends Record<string, unknown>>(
  props: IInput.TimeInputProps<TFormValues>
) => {
  const { defaultValue, helperText, timePickerProps, ...rest } = props;

  const {
    field: { ref, ...field },
    fieldState: { invalid, error },
  } = useController({ defaultValue, ...rest });

  return (
    <TimePicker
      {...field}
      inputRef={ref}
      ignoreInvalidInputs
      {...timePickerProps}
      renderInput={(params) => (
        <TextField
          {...params}
          {...rest}
          error={invalid}
          helperText={error?.message || helperText}
        />
      )}
    />
  );
};
