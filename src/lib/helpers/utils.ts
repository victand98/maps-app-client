import { ParkingPointStandStatus, Roles } from "@lib/constants";
import { ChipProps, SxProps, Theme } from "@mui/material";
import { CustomErrorResponse } from "@types";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

export const getInitials = (name: string = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

export const handleFormError = <T extends FieldValues>(
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
  !!role && roles.includes(role as Roles);

export const getDateFromTime = (time: string) => {
  const timeSplit = time.split(":");
  const date = new Date();
  date.setHours(parseInt(timeSplit[0]));
  date.setMinutes(parseInt(timeSplit[1]));

  return date;
};

export const getDatePlusHours = (date: Date, hours: number) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);

  return newDate;
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

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
};

export const stringAvatar = (name: string, props?: SxProps<Theme>) => {
  return {
    sx: {
      ...props,
      bgcolor: stringToColor(name),
    },
    children: getInitials(name),
  };
};

export const titleCase = (str: string) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};
