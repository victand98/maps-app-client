import { BikewayModel, PlaceModel, RouteModel } from "@types";
import { LatLngExpression } from "leaflet";
import { MarkerProps } from "react-leaflet";

declare namespace ChildElements {
  export interface IMarkerProps extends MarkerProps {}

  export interface PlaceDataProps {
    data: PlaceModel.PlaceResponse[];
  }

  export interface BikewayDataProps {
    data: BikewayModel.BikewayResponse[];
  }

  export interface PlaceMinimapProps {
    name: string;
    position: LatLngExpression;
    center: LatLngExpression;
    icon: string;
    color: string;
  }

  export interface BikewayMinimapProps {
    name: string;
    positions: LatLngExpression[] | LatLngExpression[][];
    // center: LatLngExpression;
    color: string;
    width: number;
    opacity: number;
  }

  /**
   * Controls
   */

  export interface RouteControlProps {
    currentRoute?: RouteModel.NewRouteResponse;
  }

  export interface LocateControlProps {
    currentRoute?: RouteModel.NewRouteResponse;
  }
}

export { ChildElements };
