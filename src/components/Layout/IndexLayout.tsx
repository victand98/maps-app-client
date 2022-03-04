import { Box, CssBaseline } from "@mui/material";
import React, { FC, ReactElement } from "react";

export const IndexLayout: FC = (props): ReactElement => {
  return (
    <Box sx={{ height: "100vh" }} component="main">
      <CssBaseline />
      {props.children}
    </Box>
  );
};
