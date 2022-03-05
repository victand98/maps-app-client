import { FieldPath } from "react-hook-form";

export interface CustomErrorResponse<T = undefined> {
  errors: {
    message: string;
    field?: FieldPath<T>;
  }[];
}
