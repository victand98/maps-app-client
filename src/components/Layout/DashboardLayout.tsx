import { Box, Container, styled } from "@mui/material";
import React, { FC, ReactElement, useState } from "react";
import {
  BottomNavbar,
  Breadcrumbs,
  DashboardNavbar,
  DashboardSidebar,
} from "..";
import { Layout } from "./Layout";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout: FC<Layout.DashboardLayoutProps> = (
  props
): ReactElement => {
  const { children, breadcrumbs, containerProps } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth="xl" {...containerProps}>
              {breadcrumbs && <Breadcrumbs sx={{ mb: 2 }} />}
              {children}
            </Container>
          </Box>
        </Box>
      </DashboardLayoutRoot>

      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />

      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />

      <BottomNavbar />
    </>
  );
};

DashboardLayout.defaultProps = {
  breadcrumbs: true,
};
