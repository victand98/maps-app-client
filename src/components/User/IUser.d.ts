import { RoleModel, UserModel } from "@types";

declare namespace IUser {
  export interface UserListResultsProps {
    users?: UserModel.UserResponse[];
  }

  export interface UserFormProps {
    roles: RoleModel.RoleResponse[];
  }

  export interface UserEditFormProps {
    open: boolean;
    onClose: () => void;
    currentUser: UserModel.UserResponse;
  }
}

export { IUser };
