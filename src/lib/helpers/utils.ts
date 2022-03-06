import { CustomErrorResponse } from "@types";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

export const getInitials = (name: string = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

export const handleFormError = <T = any>(
  err: CustomErrorResponse<T>,
  setError: UseFormSetError<T>,
  withToast: boolean = true
) => {
  for (const error of err.errors) {
    if (withToast) toast.error(error.message);

    if (error.field)
      setError(
        error.field,
        {
          message: error.message,
        },
        {
          shouldFocus: true,
        }
      );
  }
};

export const toastErrors = <T = any>(err: CustomErrorResponse<T>) => {
  for (const error of err.errors) {
    toast.error(error.message);
  }
};
