import { Info } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import React from "react";

export const PlaceTypeHelper = () => {
  return (
    <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        Información
        <Info />
      </Typography>
      <Typography>
        Los tipos de lugar sirven para clasificar los distintos
        marcadores(Lugares) en el mapa. Es por ello que se recomienda escoger un
        color adecuado y un ícono que represente en la mayor medida el nombre
        del tipo.
      </Typography>
    </Paper>
  );
};
