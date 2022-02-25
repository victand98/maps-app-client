import React, { FC, useMemo, useRef } from "react";
import { IMap } from "./IMap";
import Map from "./Map";
import Marker from "./ChildElements/Marker";

const MapPicker: FC<IMap.MapPickerProps> = (props) => {
  const [position, setPosition] = React.useState({
    lat: -3.9945,
    lng: -79.2012,
  });

  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          props.onChangePosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <Map>
      <Marker
        position={position}
        ref={markerRef}
        draggable
        eventHandlers={eventHandlers}
      />
    </Map>
  );
};

export default MapPicker;
