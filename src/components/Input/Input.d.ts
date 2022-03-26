import { TimePickerProps } from "@mui/lab";
import { AutocompleteProps, TextFieldProps } from "@mui/material";
import { UseControllerProps } from "react-hook-form";
import { NumberFormatProps } from "react-number-format";

declare namespace IInput {
  export type TextInputProps<TFormValues> = TextFieldProps &
    UseControllerProps<TFormValues>;

  export type INumberFormatProps<TFormValues> = NumberFormatProps &
    UseControllerProps<TFormValues> & {
      [key: string]: any;
      withHelpers?: boolean;
    };

  export interface AutocompleteVirtualizedProps<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
  > extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {}

  export type TimeInputProps<TFormValues> = TextInputProps<TFormValues> & {
    timePickerProps?: Partial<TimePickerProps>;
  };
}

export { IInput };
