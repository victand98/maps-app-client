import { httpClient } from "@lib";
import { RouteModel } from "@types";
import { Session } from "next-auth";

const RouteService = {
  save: (data: RouteModel.NewRouteValues, session: Session) =>
    httpClient.post("/route/", data, { params: { session } }),
  update: (data: RouteModel.UpdateRouteValues, id: string, session: Session) =>
    httpClient.put(`/route/${id}`, data, { params: { session } }),
  downloadCSV: (session: Session) =>
    httpClient.get(`/route/download/csv`, {
      responseType: "blob",
      params: { session },
    }),
};

export { RouteService };
