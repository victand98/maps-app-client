import { httpClient } from "@lib";
import { PlaceTypeModel } from "@types";

const PlaceTypeService = {
  save: (data: PlaceTypeModel.PlaceTypeValues) =>
    httpClient.post("/placetype/", data),
  update: (data: PlaceTypeModel.PlaceTypeValues, id: string) =>
    httpClient.put(`/placetype/${id}`, data),
};

export { PlaceTypeService };
