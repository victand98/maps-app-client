import React, { FC } from "react";
import { LabelProps } from "./Label";

export const Label: FC<LabelProps> = (props) => {
  return (
    <label htmlFor={props.id} className="text-gray-700">
      {props.children}{" "}
      {props.required && <span className="text-red-500 required-dot">*</span>}
    </label>
  );
};
