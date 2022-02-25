import React, { FC } from "react";
import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const Map: FC<MapContainerProps> = (props) => {
  const { children } = props;
  return (
    <MapContainer
      style={{ height: "100%", width: "100%", zIndex: 10 }}
      zoom={14}
      {...props}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

Map.defaultProps = {
  center: {
    lat: -3.9945,
    lng: -79.2012,
  },
};

export default Map;
