import React, { FC } from "react";
import { PlaceData } from "./ChildElements/PlaceData";
import { IMap } from "./IMap";
import MapOffline from "./MapOffline";

const MapViewer: FC<IMap.MapViewerProps> = (props) => {
  return (
    <MapOffline>
      <PlaceData data={props.places} />
    </MapOffline>
  );
};

export default MapViewer;
