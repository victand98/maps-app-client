import { httpClient } from "@lib";
import { LoginFormValues } from "@types";

const AuthService = {
  login: (data: LoginFormValues) => httpClient.post("/auth/signin", data),
  logout: () => httpClient.post("/auth/logout"),
};

export { AuthService };
