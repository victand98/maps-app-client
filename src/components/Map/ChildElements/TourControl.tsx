import { indexSteps, Tour } from "@components/Tour";
import { Help } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { CustomControl } from "../Core";

export const TourControl = () => {
  const [runTour, setRunTour] = useState(false);

  return (
    <CustomControl position="topright" className="tour-control">
      <Tour
        steps={indexSteps}
        run={runTour}
        onClose={() => setRunTour(false)}
      />

      <Tooltip title="Ayuda" placement="left">
        <IconButton
          onClick={() => setRunTour(true)}
          size="large"
          style={{
            backgroundColor: "#f5f5f5",
            boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Help fontSize="small" />
        </IconButton>
      </Tooltip>
    </CustomControl>
  );
};
