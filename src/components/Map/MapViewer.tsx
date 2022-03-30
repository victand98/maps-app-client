import React, { FC } from "react";
import { BikewayData } from "./ChildElements/BikewayData";
import { LocateControl } from "./ChildElements/LocateControl";
import { NavbarControl } from "./ChildElements/NavbarControl";
import { PlaceData } from "./ChildElements/PlaceData";
import { RouteControl } from "./ChildElements/RouteControl";
import { IMap } from "./IMap";
import MapOffline from "./MapOffline";

const MapViewer: FC<IMap.MapViewerProps> = (props) => {
  return (
    <MapOffline>
      <PlaceData data={props.places} />
      <BikewayData data={props.bikeways} />
      <NavbarControl />
      <RouteControl currentRoute={props.currentRoute} />
      <LocateControl currentRoute={props.currentRoute} />
    </MapOffline>
  );
};

export default MapViewer;
