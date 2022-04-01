import L from "leaflet";
import React, { FC } from "react";
import { MapConsumer, Polyline, Popup } from "react-leaflet";
import Minimap from "../Minimap";
import { ChildElements } from "./ChildElements";

const BikewayMinimap: FC<ChildElements.BikewayMinimapProps> = (props) => {
  const { name, color, opacity, positions, width } = props;

  return (
    <Minimap dragging={true} scrollWheelZoom={true} touchZoom={true} zoom={14}>
      <Polyline
        positions={positions}
        weight={width}
        stroke={true}
        color={color}
        opacity={opacity}
      >
        <Popup minWidth={90}>{name}</Popup>
      </Polyline>

      <MapConsumer>
        {(map) => {
          let bounds = new L.LatLngBounds(positions as L.LatLngBoundsLiteral);
          map.fitBounds(bounds);
          return null;
        }}
      </MapConsumer>
    </Minimap>
  );
};

export default BikewayMinimap;
