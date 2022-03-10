import { BikewayInfo } from "@components";
import { useBikeways } from "@lib";
import { Dialog } from "@mui/material";
import { BikewayModel } from "@types";
import { Feature, FeatureCollection, LineString } from "geojson";
import hash from "object-hash";
import React, { FC, Fragment, useMemo, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { ChildElements } from "./ChildElements";

export const BikewayData: FC<ChildElements.BikewayDataProps> = (props) => {
  const { data: bikeways } = useBikeways(props.data);
  const [currentBikeway, setCurrentBikeway] =
    useState<BikewayModel.BikewayResponse>();
  const [open, setOpen] = useState(false);

  const bikewaysGeojson = useMemo<FeatureCollection<LineString>>(
    () => ({
      type: "FeatureCollection",
      features: bikeways!.map<
        Feature<LineString, BikewayModel.BikewayResponse>
      >((bikeway) => ({
        type: "Feature",
        geometry: bikeway.location,
        properties: bikeway,
      })),
    }),
    [bikeways]
  );

  const handleClose = () => {
    setOpen(false);
    setCurrentBikeway(undefined);
  };

  return (
    <Fragment>
      <GeoJSON
        key={hash(bikewaysGeojson)}
        data={bikewaysGeojson}
        onEachFeature={(feature, layer) => {
          if (feature.properties && feature.properties.name)
            layer.bindPopup(feature.properties.name);

          layer.on({
            click: (e) => {
              setCurrentBikeway(feature.properties);
              setOpen(true);
            },
          });
        }}
        style={(feature) => {
          return {
            stroke: true,
            color: feature?.properties.color,
            weight: feature?.properties.width,
            opacity: feature?.properties.opacity,
          };
        }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
        scroll="body"
      >
        {currentBikeway ? (
          <BikewayInfo bikeway={currentBikeway} handleClose={handleClose} />
        ) : null}
      </Dialog>
    </Fragment>
  );
};
