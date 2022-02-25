import { MarkerDivIcon } from "@components/Icon";
import { usePlaces } from "@lib";
import { PlaceModel } from "@types";
import { Feature, FeatureCollection, Point } from "geojson";
import L from "leaflet";
import React, { FC, Fragment, useMemo } from "react";
import { GeoJSON } from "react-leaflet";
import { ChildElements } from "./ChildElements";
import hash from "object-hash";

export const PlaceData: FC<ChildElements.PlaceDataProps> = (props) => {
  const { data: places } = usePlaces(props.data);

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

  return (
    <Fragment>
      <GeoJSON
        key={hash(placesGeojson)}
        data={placesGeojson}
        onEachFeature={(feature, layer) => {
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
          }
        }}
        pointToLayer={(feature, latlng) => {
          return L.marker(latlng, {
            icon: new MarkerDivIcon("#26c30b", feature.properties.type.icon),
          });
        }}
      />
    </Fragment>
  );
};
