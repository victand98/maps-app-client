import { ParkingPointModel, PlaceModel, PlaceTypeModel } from "@types";

declare namespace IPlace {
  export interface PlaceInfoProps {
    place: PlaceModel.PlaceResponse;
    handleClose: () => void;
  }

  export interface IPlaceListResultsProps {
    places?: PlaceModel.PlaceResponse[];
    placeTypes: PlaceTypeModel.PlaceTypeResponse[];
  }

  export interface PlaceFormProps {
    placeTypes: PlaceTypeModel.PlaceTypeResponse[];
  }

  export interface PlaceEditFormProps {
    placeTypes: PlaceTypeModel.PlaceTypeResponse[];
    open: boolean;
    onClose: () => void;
    currentPlace:
      | PlaceModel.PlaceResponse
      | ParkingPointModel.ParkingPointResponse;
  }
}

export { IPlace };
