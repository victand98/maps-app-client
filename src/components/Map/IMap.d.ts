import { BikewayModel, PlaceModel, RouteModel } from "@types";
import { LineString } from "geojson";
import { LatLng } from "leaflet";

declare namespace IMap {
  export interface IMapProps {}

  export interface MapPickerProps {
    onChangePosition: (position: LatLng) => void;
  }

  export interface MapViewerProps {
    places: PlaceModel.PlaceResponse[];
    bikeways: BikewayModel.BikewayResponse[];
    currentRoute?: RouteModel.NewRouteResponse;
  }

  export interface MapBikewayDrawerProps {
    geometry?: LineString;
  }
}

export { IMap };
