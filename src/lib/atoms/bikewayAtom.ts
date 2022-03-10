import { atom } from "recoil";
import { Feature, LineString, GeoJsonProperties } from "geojson";

export interface BikewayCoordinatesStateProps {
  geometry?: Feature<LineString, GeoJsonProperties>["geometry"];
}

export const BikewayCoordinatesState = atom<BikewayCoordinatesStateProps>({
  key: "bikewayCoordinatesState",
  default: {},
});
