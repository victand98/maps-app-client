import {
  DashboardLayout,
  MyRoutesListResults,
  MyRoutesListToolbar,
} from "@components";
import { Roles, useMyRoutes } from "@lib";
import { Box, Container } from "@mui/material";
import { RouteModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const MyRoutes: NextPageWithLayout<RouteModel.MyRoutesPageProps> = (props) => {
  const { data: myRoutes } = useMyRoutes({
    fallbackData: props.myRoutes,
  });

  return (
    <>
      <Head>
        <title>Mis rutas | Ciclovía App</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <MyRoutesListToolbar />

          <Box sx={{ mt: 3 }}>
            <MyRoutesListResults myRoutes={myRoutes!} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

MyRoutes.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

MyRoutes.auth = {
  roles: Object.values(Roles),
};

MyRoutes.getInitialProps = async (context) => {
  const myRoutes = await context.client.get<RouteModel.RouteResponse[]>(
    `/route/me`
  );

  return { myRoutes: myRoutes.data };
};

export default MyRoutes;
