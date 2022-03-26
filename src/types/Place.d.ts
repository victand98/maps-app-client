import { Point } from "geojson";
import { PlaceTypeModel } from "./PlaceType";

declare namespace PlaceModel {
  export type PlaceValues = {
    formattedAddress?: string;
    name: string;
    location: {
      coordinates: string;
    };
    type: string;
    status?: boolean;
  };

  export interface PlaceResponse {
    name: string;
    formattedAddress: string;
    location: Point;
    type: Type;
    createdAt: string;
    updatedAt: string;
    __v: number;
    status: boolean;
    id: string;
    openingTime?: string;
    closingTime?: string;
    kind?: string;
  }

  interface Type {
    name: string;
    __v: number;
    color: string;
    createdAt: string;
    description: string;
    icon: string;
    status: boolean;
    updatedAt: string;
    id: string;
  }

  export interface PlacesPageProps {
    places: PlaceResponse[];
    placeTypes: PlaceTypeModel.PlaceTypeResponse[];
  }

  export interface NewPlacePageProps {
    placeTypes: PlaceTypeModel.PlaceTypeResponse[];
  }
}

export { PlaceModel };
