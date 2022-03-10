import { LineString } from "geojson";

declare namespace BikewayModel {
  export type BikewayValues = {
    name: string;
    location: Location;
    color?: string;
    width?: string;
    opacity?: string;
    description?: string;
    status?: boolean;
  };

  export interface Location {
    coordinates: Array<number[]>;
  }

  export interface BikewayResponse {
    name: string;
    location: LineString;
    color: string;
    width: number;
    opacity: number;
    description: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  }

  export interface BikewaysPageProps {
    bikeways: BikewayResponse[];
  }

  export interface NewBikewayPageProps {}

  export interface BikewayPageProps {
    bikeway: BikewayResponse;
  }
}

export { BikewayModel };
