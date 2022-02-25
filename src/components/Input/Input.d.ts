import { TextField, TextFieldProps } from "@mui/material";
import React, { FC } from "react";
import { Control, UseControllerProps } from "react-hook-form";
import { NumberFormatProps } from "react-number-format";

declare namespace IInput {
  export type TextInputProps<TFormValues> = TextFieldProps &
    UseControllerProps<TFormValues>;

  export type INumberFormatProps<TFormValues> = NumberFormatProps &
    UseControllerProps<TFormValues> & {
      [key: string]: any;
    };
}

export { IInput };
