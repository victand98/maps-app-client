import { PlaceModel } from "@types";
import { LatLngExpression } from "leaflet";
import { MarkerProps } from "react-leaflet";

declare namespace ChildElements {
  export interface IMarkerProps extends MarkerProps {}

  export interface PlaceDataProps {
    data: PlaceModel.PlaceResponse[];
  }

  export interface PlaceMinimapProps {
    name: string;
    position: LatLngExpression;
    center: LatLngExpression;
    icon: string;
    color: string;
  }
}

export { ChildElements };
