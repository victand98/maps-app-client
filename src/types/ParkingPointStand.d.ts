import { ParkingPointStandStatus } from "@lib";

declare namespace ParkingPointStandModel {
  export type ParkingPointStandValues = {
    number: number;
    parkingPoint: string;
    status?: ParkingPointStandStatus;
    entryTime?: Date | string;
    exitTime?: Date | string;
    currentStandHistory?: string;
    user?: string;
  };

  export interface ParkingPointStandResponse {
    status: ParkingPointStandStatus;
    number: number;
    parkingPoint: string;
    currentStandHistory: null;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  }
}

export { ParkingPointStandModel };
