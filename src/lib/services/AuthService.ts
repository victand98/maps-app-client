import { httpClient } from "@lib";
import { LoginFormValues, LoginResponse } from "@types";

const AuthService = {
  login: (data: LoginFormValues) =>
    httpClient.post<LoginResponse>(`/auth/signin`, data),
  logout: () => httpClient.post("/auth/logout"),
};

export { AuthService };
