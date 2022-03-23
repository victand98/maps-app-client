import useSWRRequest from "@lib/hooks/useSWRRequest";
import { UserModel } from "@types";

export const useUsers = (fallbackData?: UserModel.UserResponse[]) => {
  const users = useSWRRequest<UserModel.UserResponse[]>(
    { url: "/user" },
    { fallbackData }
  );

  return users;
};
