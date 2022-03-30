import useSWRRequest, { SWRParams } from "@lib/hooks/useSWRRequest";
import { RouteModel } from "@types";

export const useCurrentRoute = (
  params?: SWRParams<RouteModel.NewRouteResponse>
) => {
  const currentRoute = useSWRRequest<RouteModel.NewRouteResponse>(
    { url: "/route/current" },
    params
  );

  return currentRoute;
};
