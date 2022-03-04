import L from "leaflet";
import "leaflet.offline";
import React, { FC, useEffect, useState } from "react";
import { MapContainerProps } from "react-leaflet";
import Map from "./Map";

const Minimap: FC<MapContainerProps> = (props) => {
  const { children, ...rest } = props;
  const [map, setMap] = useState<L.Map>();

  useEffect(() => {
    if (map) {
      const tileLayerOffline = L.tileLayer.offline(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          subdomains: "abc",
          minZoom: 13,
          maxZoom: 17,
        }
      );

      tileLayerOffline.addTo(map);
    }
  }, [map]);

  return (
    <Map
      dragging={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      attributionControl={false}
      zoomControl={false}
      touchZoom={false}
      zoom={16}
      {...rest}
      whenCreated={setMap}
    >
      {children}
    </Map>
  );
};

export default Minimap;
