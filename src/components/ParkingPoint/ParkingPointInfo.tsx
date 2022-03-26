import { AccessAlarms } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import { IParkingPoint } from "./ParkingPoint";
import { ParkingPointDetails } from "./ParkingPointDetails";

export const ParkingPointInfo: FC<IParkingPoint.ParkingPointInfoProps> = (
  props
) => {
  const { place } = props;

  const [openDetails, setOpenDetails] = useState(false);

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          gap: 0.5,
        }}
      >
        <AccessAlarms color="disabled" fontSize="small" />

        {place.openingTime && place.closingTime ? (
          <Typography color="green" variant="body2">
            {place.openingTime} hasta {place.closingTime}
          </Typography>
        ) : (
          <Typography color="GrayText" variant="body2">
            Horario no definido
          </Typography>
        )}
      </Box>

      <Button
        variant="outlined"
        color="primary"
        sx={{
          mt: 1,
        }}
        onClick={() => {
          setOpenDetails(true);
        }}
      >
        Ver detalles
      </Button>

      {openDetails && (
        <ParkingPointDetails
          place={place}
          open={openDetails}
          onClose={() => {
            setOpenDetails(false);
          }}
        />
      )}
    </Fragment>
  );
};
