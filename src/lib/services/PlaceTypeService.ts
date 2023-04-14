import { httpClient } from "@lib";
import { PlaceTypeModel } from "@types";
import { Session } from "next-auth";

const PlaceTypeService = {
  save: (data: PlaceTypeModel.PlaceTypeValues, session: Session) =>
    httpClient.post("/placetype/", data, { params: { session } }),
  update: (
    data: Partial<PlaceTypeModel.PlaceTypeValues>,
    id: string,
    session: Session
  ) => httpClient.put(`/placetype/${id}`, data, { params: { session } }),
};

export { PlaceTypeService };
