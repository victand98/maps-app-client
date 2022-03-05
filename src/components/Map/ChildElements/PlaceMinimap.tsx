import { MarkerDivIcon } from "@components/Icon";
import React, { FC } from "react";
import Minimap from "../Minimap";
import { ChildElements } from "./ChildElements";
import Marker from "./Marker";

const PlaceMinimap: FC<ChildElements.PlaceMinimapProps> = (props) => {
  const { name, position, center, icon, color } = props;
  return (
    <Minimap center={center}>
      <Marker position={position} icon={new MarkerDivIcon(color, icon)}>
        {name}
      </Marker>
    </Minimap>
  );
};

export default PlaceMinimap;
