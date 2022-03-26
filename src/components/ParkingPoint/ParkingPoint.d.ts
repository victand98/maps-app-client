import { ParkingPointModel, PlaceModel, PlaceTypeModel } from "@types";

declare namespace IParkingPoint {
  export interface ParkingPointCardProps {
    parkingPoint: ParkingPointModel.ParkingPointResponse;
    placeTypes: PlaceTypeModel.PlaceTypeResponse[];
  }

  export interface ParkingPointFormProps {
    currentParkingPoint: ParkingPointModel.ParkingPointResponse;
    open: boolean;
    onClose: () => void;
  }

  export interface ParkingPointInfoProps {
    place: PlaceModel.PlaceResponse;
  }

  export interface ParkingPointDetailsProps {
    place: PlaceModel.PlaceResponse;
    open: boolean;
    onClose: () => void;
  }
}

export { IParkingPoint };
