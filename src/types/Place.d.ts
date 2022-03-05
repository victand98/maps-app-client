import { Point } from "geojson";

declare namespace PlaceModel {
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
  }

  export interface Type {
    name: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
    description: string;
    icon: string;
    color: string;
    id: string;
  }
}

export { PlaceModel };
