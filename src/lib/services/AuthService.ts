import { httpClient, SERVER_URI } from "@lib";
import { LoginFormValues } from "@types";
import axios from "axios";

const AuthService = {
  login: (data: LoginFormValues) =>
    axios.post(`${SERVER_URI}/auth/signin`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    }),
  logout: () => httpClient.post("/auth/logout"),
};

export { AuthService };
