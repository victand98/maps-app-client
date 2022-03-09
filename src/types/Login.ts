export type LoginFormValues = {
  email: string;
  password: string;
};

export interface LoginResponse {
  email: string;
  __v: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  status: boolean;
  updatedAt: string;
  id: string;
  accessToken?: string;
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
