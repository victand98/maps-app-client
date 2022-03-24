import { httpClient } from "@lib";
import { LoginFormValues, LoginResponse, SignupFormValues } from "@types";

const AuthService = {
  login: (data: LoginFormValues) =>
    httpClient.post<LoginResponse>(`/auth/signin`, data),
  signup: (data: SignupFormValues) => httpClient.post(`/auth/signup`, data),
  logout: () => httpClient.post("/auth/logout"),
};

export { AuthService };
