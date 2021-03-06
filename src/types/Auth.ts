import { CyclistTypes, Genders, Permissions } from "@lib";

export type SignupFormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  repeatPassword?: string;
  cyclistType: CyclistTypes;
  gender: Genders;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export interface LoginResponse {
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  role: Role;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  accessToken?: string;
}

export interface Role {
  name: string;
  __v: number;
  createdAt: string;
  status: boolean;
  updatedAt: string;
  id: string;
}

export interface CurrentUser {
  currentUser: {
    email: string;
    __v: number;
    createdAt: string;
    firstName: string;
    lastName: string;
    status: boolean;
    updatedAt: string;
    id: string;
    iat: number;
  } | null;
}

export interface Permission {
  name: Permissions;
  __v: number;
  createdAt: string;
  roles: string[];
  status: boolean;
  updatedAt: string;
  id: string;
}
