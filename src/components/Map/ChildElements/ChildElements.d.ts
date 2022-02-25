import { PlaceModel } from "@types";
import { MarkerProps } from "react-leaflet";

declare namespace ChildElements {
  export interface IMarkerProps extends MarkerProps {}

  export interface PlaceDataProps {
    data: PlaceModel.PlaceResponse[];
  }
}

export { ChildElements };
