import React, { FC } from "react";
import { LocateControl } from "./ChildElements/LocateControl";
import { LocationMarker } from "./ChildElements/LocationMarker";
import { PlaceData } from "./ChildElements/PlaceData";
import { IMap } from "./IMap";
import MapOffline from "./MapOffline";

const MapViewer: FC<IMap.MapViewerProps> = (props) => {
  return (
    <MapOffline>
      <PlaceData data={props.places} />
      <LocateControl />
      <LocationMarker />
    </MapOffline>
  );
};

export default MapViewer;
