import Map from "@components/Map/Map";
import { deepPurple } from "@mui/material/colors";
import L from "leaflet";
import React, { FC, useMemo } from "react";
import { MapConsumer, Polyline, Popup } from "react-leaflet";
import { UIRoute } from "./UIRoute";

const RouteMapViewer: FC<UIRoute.RouteMapViewerProps> = (props) => {
  const { route } = props;

  const positions = useMemo<L.LatLngExpression[] | null>(
    () =>
      route.location
        ? (route.location.coordinates.map((coordinate) => [
            coordinate[1],
            coordinate[0],
          ]) as L.LatLngExpression[])
        : null,
    [route.location]
  );

  return (
    <Map>
      {positions && (
        <Polyline positions={positions} color={deepPurple[500]} weight={5}>
          <Popup>{route.name}</Popup>
        </Polyline>
      )}
      {positions && (
        <MapConsumer>
          {(map) => {
            let bounds = new L.LatLngBounds(positions as L.LatLngBoundsLiteral);
            map.fitBounds(bounds);
            return null;
          }}
        </MapConsumer>
      )}
    </Map>
  );
};

export default RouteMapViewer;
