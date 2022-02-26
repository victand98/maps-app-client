import { LatLngExpression } from "leaflet";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import { toast } from "react-toastify";
import Marker from "./Marker";

export const LocationMarker = () => {
  const [position, setPosition] = useState<LatLngExpression>();
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationerror(e) {
      toast.error("Ha ocurrido un error al acceder a su ubicación actual");
    },
  });

  return position === undefined ? null : (
    <Marker position={position}>Mi ubicación actual</Marker>
  );
};
