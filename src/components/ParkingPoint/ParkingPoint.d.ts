import { ParkingPointModel, PlaceTypeModel } from "@types";

declare namespace IParkingPoint {
  export interface ParkingPointCardProps {
    parkingPoint: ParkingPointModel.ParkingPointResponse;
    placeTypes: PlaceTypeModel.PlaceTypeResponse[];
  }

  export interface ParkingPointFormProps {
    placeTypes: PlaceTypeModel.PlaceTypeResponse[];
  }
}

export { IParkingPoint };
