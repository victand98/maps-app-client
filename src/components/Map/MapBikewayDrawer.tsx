import { BikewayCoordinatesState } from "@lib";
import { FeatureCollection, LineString } from "geojson";
import L from "leaflet";
import React, { FC, useEffect, useMemo, useRef } from "react";
import { MapConsumer, Polyline } from "react-leaflet";
import { useRecoilState, useResetRecoilState } from "recoil";
import { IMap } from "./IMap";
import MapDrawer from "./MapDrawer";

const MapBikewayDrawer: FC<IMap.MapBikewayDrawerProps> = (props) => {
  const { geometry } = props;
  const featureGroupRef = useRef<L.FeatureGroup<LineString>>();
  const [bikewayCoordinates, setBikewayCoordinates] = useRecoilState(
    BikewayCoordinatesState
  );
  const resetBikewayCoordinatesState = useResetRecoilState(
    BikewayCoordinatesState
  );
  const positions = useMemo<L.LatLngExpression[] | null>(
    () =>
      geometry
        ? (geometry.coordinates.map((coordinate) => [
            coordinate[1],
            coordinate[0],
          ]) as L.LatLngExpression[])
        : null,
    [geometry]
  );

  useEffect(() => {
    if (geometry) setBikewayCoordinates({ geometry });
  }, [geometry, setBikewayCoordinates]);

  const onCreated = (e: any) => {
    //@ts-ignore
    const drawnItems = featureGroupRef.current!._layers;
    if (Object.keys(drawnItems).length > 1) {
      Object.keys(drawnItems).forEach((layerid, index) => {
        if (index > 0) return;
        const layer = drawnItems[layerid];
        featureGroupRef.current!.removeLayer(layer);
      });
    }

    const bikewayGeometry = (
      featureGroupRef.current!.toGeoJSON() as FeatureCollection<LineString>
    ).features[0].geometry;
    console.log("bikewayGeometry Created", bikewayGeometry);
    setBikewayCoordinates({ geometry: bikewayGeometry });
  };
  const onEdited = (e: any) => {
    const bikewayGeometry = (
      featureGroupRef.current!.toGeoJSON() as FeatureCollection<LineString>
    ).features[0].geometry;
    console.log("bikewayGeometry Edited", bikewayGeometry);
    setBikewayCoordinates({ geometry: bikewayGeometry });
  };

  const onDeleted = (e: any) => {
    resetBikewayCoordinatesState();
  };

  return (
    <MapDrawer
      featureGroupRef={featureGroupRef}
      position="topright"
      draw={{
        circle: false,
        circlemarker: false,
        marker: false,
        polygon: false,
        rectangle: false,
      }}
      onCreated={onCreated}
      onEdited={onEdited}
      onDeleted={onDeleted}
    >
      {positions && <Polyline positions={positions} />}
      {positions && (
        <MapConsumer>
          {(map) => {
            let bounds = new L.LatLngBounds(positions as L.LatLngBoundsLiteral);
            map.fitBounds(bounds);
            return null;
          }}
        </MapConsumer>
      )}
    </MapDrawer>
  );
};

export default MapBikewayDrawer;
