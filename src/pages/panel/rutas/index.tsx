import {
  DashboardLayout,
  RoutesListResults,
  RoutesListToolbar,
} from "@components";
import { Roles, useRoutes } from "@lib";
import { Box } from "@mui/material";
import { RouteModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const Routes: NextPageWithLayout<RouteModel.RoutesPageProps> = (props) => {
  const { data: routes } = useRoutes({
    fallbackData: props.routes,
  });

  return (
    <>
      <Head>
        <title>Rutas | Ciclovía App</title>
      </Head>

      <RoutesListToolbar />

      <Box sx={{ mt: 3 }}>
        <RoutesListResults routes={routes!} />
      </Box>
    </>
  );
};

Routes.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Routes.auth = {
  roles: Object.values(Roles),
};

Routes.getInitialProps = async (context) => {
  const routes = await context.client.get<RouteModel.RouteResponse[]>(
    `/route/`
  );

  return { routes: routes.data };
};

export default Routes;
