import { httpClient } from "@lib";
import { ParkingPointStandModel } from "@types";
import { Session } from "next-auth";

const ParkingPointStandService = {
  save: (
    data: ParkingPointStandModel.ParkingPointStandValues,
    session: Session
  ) => httpClient.post("/parkingpointstand/", data, { params: { session } }),
  update: (
    data: ParkingPointStandModel.ParkingPointStandValues,
    id: string,
    session: Session
  ) =>
    httpClient.put(`/parkingpointstand/${id}`, data, { params: { session } }),
};

export { ParkingPointStandService };
