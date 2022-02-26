import { IconButton, Tooltip } from "@mui/material";
import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";
import React, { FC, useCallback, useEffect } from "react";
import reactDom from "react-dom";
import { MyLocation } from "@mui/icons-material";

interface LocateOptions extends L.ControlOptions {
  zoomInText?: string | undefined;
  zoomInTitle?: string | undefined;
  zoomOutText?: string | undefined;
  zoomOutTitle?: string | undefined;
}

class Locate extends L.Control {
  options: LocateOptions = { position: "bottomright" };

  constructor(options?: LocateOptions) {
    super(options);
  }
}

const LocateButton: FC<{ map: L.Map }> = (props) => {
  const { map } = props;

  const findLocation = useCallback(() => {
    map.locate({ watch: true });
  }, [map]);

  useEffect(() => {
    findLocation();
  }, [findLocation]);

  return (
    <Tooltip title="Localizar">
      <IconButton
        onClick={findLocation}
        size="large"
        style={{
          width: "35px",
          height: "35px",
          backgroundColor: "#f5f5f5",
          boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <MyLocation fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

const createInstance = (props: LocateOptions) => {
  const instance = new Locate(props);

  instance.onAdd = (map) => {
    let div = L.DomUtil.create("div", "");
    reactDom.render(<LocateButton map={map} />, div);
    return div;
  };

  return instance;
};

export const LocateControl = createControlComponent(createInstance);
