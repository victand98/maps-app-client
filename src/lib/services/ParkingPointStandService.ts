import { httpClient } from "@lib";
import { ParkingPointStandModel } from "@types";

const ParkingPointStandService = {
  save: (data: ParkingPointStandModel.ParkingPointStandValues) =>
    httpClient.post("/parkingpointstand/", data),
  update: (data: ParkingPointStandModel.ParkingPointStandValues, id: string) =>
    httpClient.put(`/parkingpointstand/${id}`, data),
};

export { ParkingPointStandService };
