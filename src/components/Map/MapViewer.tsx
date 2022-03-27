import React, { FC } from "react";
import { BikewayData } from "./ChildElements/BikewayData";
import { LocateControl } from "./ChildElements/LocateControl";
import { LocationMarker } from "./ChildElements/LocationMarker";
import { NavbarControl } from "./ChildElements/NavbarControl";
import { PlaceData } from "./ChildElements/PlaceData";
import { IMap } from "./IMap";
import MapOffline from "./MapOffline";

const MapViewer: FC<IMap.MapViewerProps> = (props) => {
  return (
    <MapOffline>
      <PlaceData data={props.places} />
      <BikewayData data={props.bikeways} />
      <NavbarControl />
      <LocateControl />
      <LocationMarker />
    </MapOffline>
  );
};

export default MapViewer;
