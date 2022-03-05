import { httpClient } from "@lib";
import { PlaceTypeModel } from "@types";

const PlaceTypeService = {
  save: (data: PlaceTypeModel.PlaceTypeValues) =>
    httpClient.post("/placetype/", data),
};

export { PlaceTypeService };
