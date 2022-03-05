import { IconsModel } from "@types";

declare namespace PlaceTypeModel {
  export type PlaceTypeValues = {
    name: string;
    description: string;
    icon: string;
    color: string;
  };

  export interface PlaceTypeResponse {
    name: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
    description: string;
    icon: string;
    color: string;
    status: boolean;
    id: string;
  }

  export interface IPagePlaceTypesProps {
    placeTypes?: PlaceTypeResponse[];
  }

  export interface IPageNewPlaceTypeProps {
    iconOptions: IconsModel.IconsResponse[];
  }
}

export { PlaceTypeModel };
