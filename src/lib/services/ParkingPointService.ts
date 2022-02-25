import { httpClient } from "@lib";
import { ParkingPointModel } from "@types";

const ParkingPointService = {
  save: (data: ParkingPointModel.ParkingPointValues) =>
    httpClient.post("/parkingpoint/", data),
};

export { ParkingPointService };
