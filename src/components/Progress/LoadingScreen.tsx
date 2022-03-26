import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { Copyright, IndexLayout } from "..";

export const LoadingScreen = () => {
  return (
    <IndexLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: "30px",
        }}
      >
        <CircularProgress color="primary" />
        <Copyright />
      </Box>
    </IndexLayout>
  );
};
