import { httpClient } from "@lib";
import { UserModel } from "@types";
import { Session } from "next-auth";

const UserService = {
  save: (data: UserModel.UserValues, session: Session) =>
    httpClient.post("/user/", data, { params: { session } }),
  update: (data: Partial<UserModel.UserValues>, id: string, session: Session) =>
    httpClient.put(`/user/${id}`, data, { params: { session } }),
};

export { UserService };
