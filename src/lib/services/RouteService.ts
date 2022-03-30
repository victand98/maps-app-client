import { httpClient } from "@lib";
import { RouteModel } from "@types";

const RouteService = {
  save: (data: RouteModel.NewRouteValues) => httpClient.post("/route/", data),
  update: (data: RouteModel.UpdateRouteValues, id: string) =>
    httpClient.put(`/route/${id}`, data),
};

export { RouteService };
