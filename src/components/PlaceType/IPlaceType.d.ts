import { IconsModel, PlaceTypeModel } from "@types";

declare namespace IPlaceType {
  export interface IPlaceTypeListResultsProps {
    placeTypes?: PlaceTypeModel.PlaceTypeResponse[];
    iconOptions: IconsModel.IconsResponse[];
  }

  export interface PlaceTypeFormProps {
    iconOptions: IconsModel.IconsResponse[];
  }
  export interface PlaceTypeEditFormProps {
    iconOptions: IconsModel.IconsResponse[];
    open: boolean;
    onClose: () => void;
    currentPlaceType: PlaceTypeModel.PlaceTypeResponse;
  }
}

export { IPlaceType };
