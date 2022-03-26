import { ParkingPointStandStatus } from "@lib";
import { PlaceTypeModel } from "./PlaceType";

declare namespace ParkingPointModel {
  export interface ParkingPointResponse {
    openingTime?: string;
    closingTime?: string;
    name: string;
    formattedAddress?: string;
    location: { type: string; coordinates: number[]; id: string };
    type: Type;
    status: boolean;
    kind: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  }

  interface Type {
    name: string;
    __v: number;
    color: string;
    createdAt: string;
    description?: string;
    icon: string;
    status: boolean;
    updatedAt: string;
    id: string;
  }

  export type ParkingPointValues = {
    openingTime: Date | string;
    closingTime: Date | string;
  };

  /**
   * One Parking Point Response
   */
  export interface SingleParkingPointResponse {
    parkingPoint: ParkingPointResponse;
    parkingPointStands: ParkingPointStand[];
  }

  export interface ParkingPointStand {
    status: ParkingPointStandStatus;
    number: number;
    parkingPoint: string;
    currentStandHistory: CurrentStandHistory | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  }

  export interface CurrentStandHistory {
    entryTime: string;
    user: User;
    id: string;
  }

  interface User {
    firstName: string;
    lastName: string;
    email: string;
    status: boolean;
    id: string;
  }

  /**
   * Page Types
   */
  export interface ParkingPointsPageProps {
    parkingPoints?: ParkingPointResponse[];
    placeTypes: PlaceTypeModel.PlaceTypeResponse[];
  }

  export interface ParkingPointPageProps {
    parkingPoint: SingleParkingPointResponse;
  }
}

export { ParkingPointModel };
