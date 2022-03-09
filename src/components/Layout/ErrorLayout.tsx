import { Box, Container } from "@mui/material";
import React, { FC, ReactElement } from "react";

export const ErrorLayout: FC = (props): ReactElement => {
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">{props.children}</Container>
    </Box>
  );
};
