import { httpClient, PlaceTypes } from "@lib";
import { PlaceModel } from "@types";

const PlaceService = {
  save: (data: PlaceModel.PlaceValues, placeType: string) => {
    switch (placeType) {
      case PlaceTypes.parking:
        return httpClient.post("/parkingpoint/", data);
      default:
        return httpClient.post("/place/", data);
    }
  },
  update: (data: PlaceModel.PlaceValues, id: string) =>
    httpClient.put(`/place/${id}`, data),
};

export { PlaceService };
