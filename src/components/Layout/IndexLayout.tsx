import { Box, CssBaseline } from "@mui/material";
import React, { FC } from "react";

export const IndexLayout: FC = (props) => {
  return (
    <Box sx={{ height: "100vh" }} component="main">
      <CssBaseline />
      {props.children}
    </Box>
  );
};
