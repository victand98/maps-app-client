import { RoleModel } from "@types";

declare namespace UserModel {
  /**
   * User Response
   */
  export interface UserResponse {
    firstName: string;
    lastName: string;
    email: string;
    status: boolean;
    role: Role;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  }

  export interface Role {
    name: string;
    __v: number;
    createdAt: string;
    status: boolean;
    updatedAt: string;
    id: string;
  }

  /**
   * User Form Values
   */

  export type UserValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword?: string;
    status?: boolean;
    role?: string;
  };

  export type UserOptions = {
    label: string;
    value: string;
  };

  /**
   * Page Interfaces
   */
  export interface UsersPageProps {
    users: UserResponse[];
  }

  export interface NewUserPageProps {
    roles: RoleModel.RoleResponse[];
  }

  export interface MyProfilePageProps {
    profile: UserResponse;
  }

  export interface ProfilePageProps {
    profile: UserResponse;
  }
}

export { UserModel };
