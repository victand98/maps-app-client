import React, { FC } from "react";
import { Polyline, Popup } from "react-leaflet";
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
    </Minimap>
  );
};

export default BikewayMinimap;
