import { Container, CssBaseline } from "@mui/material";
import React, { FC, ReactElement } from "react";
import { BottomNavbar, Copyright } from "..";
import { LayoutProps } from "./Layout";

export const DefaultLayout: FC<LayoutProps> = (props): ReactElement => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      {props.children}
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <BottomNavbar />
    </Container>
  );
};
