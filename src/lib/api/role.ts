import useSWRRequest, { SWRParams } from "@lib/hooks/useSWRRequest";
import { RoleModel } from "@types";

export const useRoles = (params?: SWRParams<RoleModel.RoleResponse[]>) => {
  const roles = useSWRRequest<RoleModel.RoleResponse[]>(
    { url: "/role" },
    params
  );

  return roles;
};
