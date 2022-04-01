import useSWRRequest, { SWRParams } from "@lib/hooks/useSWRRequest";
import { Permission } from "@types";

export const usePermissions = (params?: SWRParams<Permission[]>) => {
  const permissions = useSWRRequest<Permission[]>(
    { url: `/auth/user/permissions` },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      ...params,
    }
  );

  return permissions;
};
