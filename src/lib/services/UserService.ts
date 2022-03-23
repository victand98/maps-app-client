import { httpClient } from "@lib";
import { UserModel } from "@types";

const UserService = {
  save: (data: UserModel.UserValues) => httpClient.post("/user/", data),
  update: (data: UserModel.UserValues, id: string) =>
    httpClient.put(`/user/${id}`, data),
};

export { UserService };
