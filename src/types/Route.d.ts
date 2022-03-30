import { BikeTypes, Purposes } from "@lib";

declare namespace RouteModel {
  /**
   * Responses
   */
  export interface NewRouteResponse {
    name: string;
    startTime: string;
    purpose: Purposes;
    bikeType: BikeTypes;
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  }

  /**
   * Form Values
   */
  export type NewRouteValues = {
    name: string;
    startTime: string;
    purpose: Purposes;
    bikeType: BikeTypes;
    user: string;
  };

  export interface UpdateRouteValues {
    location: { coordinates: Array<number[]> };
    endTime: string;
  }
}

export { RouteModel };
