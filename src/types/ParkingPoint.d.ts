import { PlaceTypeModel } from "./PlaceType";

declare namespace ParkingPointModel {
  export interface ParkingPointResponse {
    spots: number;
    occupied: number;
    name: string;
    formattedAddress?: string;
    location: { type: string; coordinates: number[]; id: string };
    type: Type;
    kind: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    status: boolean;
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
    spots: number;
    occupied: number;
  };

  /**
   * Page Types
   */
  export interface ParkingPointsPageProps {
    parkingPoints?: ParkingPointResponse[];
    placeTypes: PlaceTypeModel.PlaceTypeResponse[];
  }
}

export { ParkingPointModel };
