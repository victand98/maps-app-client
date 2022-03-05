import { IconsModel, PlaceTypeModel } from "@types";

declare namespace IPlaceType {
  export interface IPlaceTypeListResultsProps {
    placeTypes?: PlaceTypeModel.PlaceTypeResponse[];
  }

  export interface PlaceTypeFormProps {
    iconOptions: IconsModel.IconsResponse[];
  }
}

export { IPlaceType };
