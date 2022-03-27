import { UserModel } from "@types";

declare namespace IProfile {
  export interface ProfileCardProps {
    profile: UserModel.UserResponse;
  }

  export interface ProfileFormProps {
    profile: UserModel.UserResponse;
  }

  export interface ProfileDetailsProps {
    profile: UserModel.UserResponse;
  }

  export interface ChangePasswordFormProps {}

  export type ChangePasswordValues = {
    password: string;
    newPassword: string;
    repeatNewPassword: string;
  };
}

export { IProfile };
