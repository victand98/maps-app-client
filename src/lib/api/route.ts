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

export const useMyRoutes = (params?: SWRParams<RouteModel.RouteResponse[]>) => {
  const myRoutes = useSWRRequest<RouteModel.RouteResponse[]>(
    { url: "/route/me" },
    params
  );

  return myRoutes;
};

export const useRoute = (params: SWRParams<RouteModel.SingleRouteResponse>) => {
  const { id } = params;
  const route = useSWRRequest<RouteModel.SingleRouteResponse>(
    { url: `/route/${id}` },
    params
  );

  return route;
};

export const useRoutes = (params?: SWRParams<RouteModel.RouteResponse[]>) => {
  const routes = useSWRRequest<RouteModel.RouteResponse[]>(
    { url: `/route/` },
    params
  );

  return routes;
};
