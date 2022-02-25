import { ParkingPointModel, PlaceTypeModel } from "@types";

declare namespace IParkingPoint {
  export interface ParkingPointCardProps {
    parkingPoint: ParkingPointModel.ParkingPointResponse;
  }

  export interface ParkingPointFormProps {
    placeTypes: PlaceTypeModel.PlaceTypeResponse[];
  }
}

export { IParkingPoint };
