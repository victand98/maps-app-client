import React from "react";
import { MarkerProps } from "react-leaflet";
import { LatLng } from "leaflet";
import { PlaceModel } from "@types";

declare namespace IMap {
  export interface IMapProps {}

  export interface MapPickerProps {
    onChangePosition: (position: LatLng) => void;
  }

  export interface MapViewerProps {
    places: PlaceModel.PlaceResponse[];
  }
}

export { IMap };
