import { IProfile } from "@components/Profile/IProfile";
import { httpClient } from "@lib";
import { LoginFormValues, LoginResponse, SignupFormValues } from "@types";

const AuthService = {
  login: (data: LoginFormValues) =>
    httpClient.post<LoginResponse>(`/auth/signin`, data),
  signup: (data: SignupFormValues) => httpClient.post(`/auth/signup`, data),
  logout: () => httpClient.post("/auth/logout"),
  updatePassword: (data: IProfile.ChangePasswordValues) =>
    httpClient.put("/auth/update/password", data),
};

export { AuthService };
