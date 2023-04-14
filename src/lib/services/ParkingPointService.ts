import { httpClient } from "@lib";
import { ParkingPointModel } from "@types";
import { Session } from "next-auth";

const ParkingPointService = {
  save: (data: ParkingPointModel.ParkingPointValues, session: Session) =>
    httpClient.post("/parkingpoint/", data, { params: { session } }),
};

export { ParkingPointService };
