import React from "react";
import { Marker as LMarker, Popup } from "react-leaflet";
import { ChildElements } from "./ChildElements";

const Marker = React.forwardRef<L.Marker, ChildElements.IMarkerProps>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <LMarker {...props} {...rest} ref={ref}>
        <Popup minWidth={90}>{children}</Popup>
      </LMarker>
    );
  }
);

Marker.defaultProps = {
  children: "Posición Actual",
  position: {
    lat: -3.9945,
    lng: -79.2012,
  },
};

export default Marker;
