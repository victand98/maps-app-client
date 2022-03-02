import { httpClient, SERVER_URI } from "@lib";
import { LoginFormValues } from "@types";

const AuthService = {
  login: (data: LoginFormValues) =>
    httpClient.post(`${SERVER_URI}/auth/signin`, data),
  logout: () => httpClient.post("/auth/logout"),
};

export { AuthService };
