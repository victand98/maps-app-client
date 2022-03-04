import { PlaceTypes } from "@lib";

declare namespace PlaceTypeModel {
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
}

export { PlaceTypeModel };
