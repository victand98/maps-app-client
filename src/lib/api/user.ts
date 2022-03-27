import useSWRRequest, { SWRParams } from "@lib/hooks/useSWRRequest";
import { UserModel } from "@types";

export const useUsers = (fallbackData?: UserModel.UserResponse[]) => {
  const users = useSWRRequest<UserModel.UserResponse[]>(
    { url: "/user" },
    { fallbackData }
  );

  return users;
};

export const useUser = (params: SWRParams<UserModel.UserResponse>) => {
  const { id, ...config } = params;
  const user = useSWRRequest<UserModel.UserResponse>(
    { url: `/user/${id}` },
    config
  );
  return user;
};
