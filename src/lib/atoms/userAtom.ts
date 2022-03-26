import { UserModel } from "@types";
import { atom } from "recoil";

export const userPreviewState = atom<UserModel.UserValues>({
  key: "userPreviewState",
  default: {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  },
});
