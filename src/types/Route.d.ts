import { BikeTypes, Purposes } from "@lib";
import { LineString } from "geojson";
import { UserModel } from "./User";

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

  export interface RouteResponse {
    name: string;
    startTime: string;
    purpose: string;
    bikeType: string;
    user: Omit<UserModel.UserResponse, "role"> & { role: string };
    createdAt: string;
    updatedAt: string;
    __v: number;
    endTime?: string;
    id: string;
  }

  export interface SingleRouteResponse {
    name: string;
    startTime: string;
    purpose: string;
    bikeType: string;
    user: Omit<UserModel.UserResponse, "role"> & { role: string };
    createdAt: string;
    updatedAt: string;
    __v: number;
    endTime?: string;
    location?: LineString;
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

  /**
   * Pages
   */

  export interface MyRoutesPageProps {
    myRoutes: RouteResponse[];
  }

  export interface RoutePageProps {
    route: SingleRouteResponse;
  }

  export interface RoutesPageProps {
    routes: RouteResponse[];
  }
}

export { RouteModel };
