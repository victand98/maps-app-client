import { PlaceTypeModel } from "./PlaceType";

declare namespace ParkingPointModel {
  export interface ParkingPointResponse {
    spots: number;
    occupied: number;
    name: string;
    location: {
      type: string;
      coordinates: number[];
      id: string;
    };
    type: Type;
    kind: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  }

  interface Type {
    name: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
    description: string;
    icon: string;
    id: string;
  }

  export type ParkingPointValues = {
    spots: number;
    occupied: number;
    name: string;
    location: Location;
    type: string;
  };

  interface Location {
    coordinates: string;
  }

  /**
   * Page Types
   */
  export interface IPageParkingPointsProps {
    parkingPoints?: ParkingPointResponse[];
  }

  export interface IPageNewParkingPointProps {
    placeTypes: PlaceTypeModel.PlaceTypeResponse[];
  }
}

export { ParkingPointModel };
