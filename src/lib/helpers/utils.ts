import { ParkingPointStandStatus, Roles } from "@lib/constants";
import { ChipProps } from "@mui/material";
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

export const hasAccess = (roles: Roles[], role?: string) =>
  role && roles.includes(role as Roles);

export const getDateFromTime = (time: string) => {
  const timeSplit = time.split(":");
  const date = new Date();
  date.setHours(parseInt(timeSplit[0]));
  date.setMinutes(parseInt(timeSplit[1]));

  return date;
};

export const getMaxNumber = (array: number[]) => Math.max(...array);

export const getStandChipColor = (
  status: ParkingPointStandStatus
): ChipProps["color"] => {
  switch (status) {
    case ParkingPointStandStatus.disabled:
      return "default";
    case ParkingPointStandStatus.occupied:
      return "error";
    case ParkingPointStandStatus.unoccupied:
      return "secondary";
    default:
      return "default";
  }
};
