import { PlaceInfo } from "@components";
import { MarkerDivIcon } from "@components/Icon";
import { usePlaces } from "@lib";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { PlaceModel } from "@types";
import { Feature, FeatureCollection, Point } from "geojson";
import L from "leaflet";
import hash from "object-hash";
import React, { FC, Fragment, useMemo, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { ChildElements } from "./ChildElements";

export const PlaceData: FC<ChildElements.PlaceDataProps> = (props) => {
  const { data: places } = usePlaces(props.data);
  const [currentPlace, setCurrentPlace] = useState<PlaceModel.PlaceResponse>();
  const [open, setOpen] = useState(false);

  const placesGeojson = useMemo<FeatureCollection<Point>>(
    () => ({
      type: "FeatureCollection",
      features: places!.map<Feature<Point, PlaceModel.PlaceResponse>>(
        (place) => ({
          type: "Feature",
          geometry: place.location,
          properties: place,
        })
      ),
    }),
    [places]
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <GeoJSON
        key={hash(placesGeojson)}
        data={placesGeojson}
        onEachFeature={(feature, layer) => {
          if (feature.properties && feature.properties.name)
            layer.bindPopup(feature.properties.name);

          layer.on({
            click: (e) => {
              setOpen(true);
              setCurrentPlace(feature.properties);
            },
          });
        }}
        pointToLayer={(feature, latlng) => {
          return L.marker(latlng, {
            icon: new MarkerDivIcon("#26c30b", feature.properties.type.icon),
          });
        }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        {/* <DialogTitle id="alert-dialog-title">Información del Lugar</DialogTitle> */}
        <PlaceInfo place={currentPlace} />
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
