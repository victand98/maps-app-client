import { IProfile } from "@components/Profile/IProfile";
import { httpClient } from "@lib";
import { LoginFormValues, LoginResponse, SignupFormValues } from "@types";
import { Session } from "next-auth";

const AuthService = {
  login: (data: LoginFormValues) =>
    httpClient.post<LoginResponse>(`/auth/signin`, data),
  signup: (data: SignupFormValues) => httpClient.post(`/auth/signup`, data),
  logout: () => httpClient.post("/auth/logout"),
  updatePassword: (data: IProfile.ChangePasswordValues, session: Session) =>
    httpClient.put("/auth/update/password", data, { params: { session } }),
};

export { AuthService };
