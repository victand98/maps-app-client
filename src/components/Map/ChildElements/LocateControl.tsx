import { MyLocation } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { RouteModel } from "@types";
import { LatLngExpression } from "leaflet";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { toast } from "react-toastify";
import { CustomControl } from "../Core";
import { ChildElements } from "./ChildElements";
import Marker from "./Marker";

export const LocateControl: FC<ChildElements.LocateControlProps> = (props) => {
  const { currentRoute } = props;
  const [position, setPosition] = useState<LatLngExpression>();

  const map = useMapEvents({
    locationfound(e) {
      if (currentRoute) {
        const location: RouteModel.UpdateRouteValues["location"] = {
          coordinates: [],
        };
        if (localStorage.getItem("location") !== null) {
          const savedLocations: RouteModel.UpdateRouteValues["location"] =
            JSON.parse(localStorage.getItem("location")!);
          location.coordinates.push(...savedLocations.coordinates);
        }
        location.coordinates.push([e.latlng.lng, e.latlng.lat]);
        localStorage.setItem("location", JSON.stringify(location));
      }
      setPosition(e.latlng);
    },
    locationerror(e) {
      toast.error("No se ha podido acceder a su ubicación actual", {
        toastId: "NoLocationFound",
      });
    },
  });

  const findLocation = useCallback(() => {
    map.locate({ watch: true });
  }, [map]);

  useEffect(() => {
    findLocation();
  }, [findLocation]);

  return (
    <Fragment>
      {position === undefined ? null : (
        <Marker position={position}>Mi ubicación actual</Marker>
      )}

      <CustomControl position="bottomright">
        <Tooltip title="Encontrar mi ubicación" placement="left">
          <IconButton
            onClick={findLocation}
            size="large"
            style={{
              backgroundColor: "#f5f5f5",
              boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <MyLocation fontSize="small" />
          </IconButton>
        </Tooltip>
      </CustomControl>
    </Fragment>
  );
};
