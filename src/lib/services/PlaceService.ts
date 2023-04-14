import { httpClient, PlaceTypes } from "@lib";
import { PlaceModel } from "@types";
import { Session } from "next-auth";

const PlaceService = {
  save: (data: PlaceModel.PlaceValues, placeType: string, session: Session) => {
    switch (placeType) {
      case PlaceTypes.parking:
        return httpClient.post("/parkingpoint/", data, { params: { session } });
      default:
        return httpClient.post("/place/", data, { params: { session } });
    }
  },
  update: (
    data: Partial<PlaceModel.PlaceValues>,
    id: string,
    session: Session
  ) => httpClient.put(`/place/${id}`, data, { params: { session } }),
};

export { PlaceService };
