import { Point } from "geojson";
import { PlaceTypeModel } from "./PlaceType";

declare namespace PlaceModel {
  export type PlaceValues = {
    spots?: number;
    occupied?: number;
    formattedAddress?: string;
    name: string;
    location: Location;
    type: string;
    status?: boolean;
  };
  interface Location {
    coordinates: string;
  }

  export interface PlaceResponse {
    name: string;
    location: Point;
    type: Type;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
    spots?: number;
    occupied?: number;
    kind?: string;
    formattedAddress?: string;
    status: boolean;
  }

  interface Type {
    name: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
    description: string;
    icon: string;
    color: string;
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
