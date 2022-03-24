import { Box, CssBaseline } from "@mui/material";
import React, { FC, ReactElement } from "react";
import { BottomNavbar } from "..";

export const IndexLayout: FC = (props): ReactElement => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
      component="main"
    >
      <CssBaseline />
      {props.children}
      <BottomNavbar sx={{ position: "sticky" }} />
    </Box>
  );
};
