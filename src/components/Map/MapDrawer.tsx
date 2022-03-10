import { FeatureGroup as FeatureGroupClass } from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import React, { Component } from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl, EditControlProps } from "react-leaflet-draw";
import Map from "./Map";

interface MapDrawerProps extends EditControlProps {
  featureGroupRef:
    | React.MutableRefObject<FeatureGroupClass<any> | undefined>
    | undefined;
}

class MapDrawer extends Component<MapDrawerProps> {
  render() {
    const { featureGroupRef, children, ...rest } = this.props;
    return (
      <div style={{ height: "500px" }}>
        <Map>
          <FeatureGroup
            ref={featureGroupRef as React.Ref<FeatureGroupClass<any>>}
          >
            <EditControl {...rest} />
            {children}
          </FeatureGroup>
        </Map>
      </div>
    );
  }
}

export default MapDrawer;
