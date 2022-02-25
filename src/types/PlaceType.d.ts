import { PlaceTypes } from "@lib";

declare namespace PlaceTypeModel {
  export interface PlaceTypeResponse {
    name: PlaceTypes;
    __v: number;
    createdAt: string;
    updatedAt: string;
    description: string;
    icon: string;
    id: string;
  }
}

export { PlaceTypeModel };
