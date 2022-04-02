import { DashboardLayout, RouteDetails } from "@components";
import { Roles, useRoute } from "@lib";
import { Grid, Typography } from "@mui/material";
import { RouteModel } from "@types";
import { NextPageWithLayout } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { ReactElement } from "react";

const RouteMapViewer = dynamic(
  () => import("@components/Route/RouteMapViewer"),
  {
    ssr: false,
  }
);

const Route: NextPageWithLayout<RouteModel.RoutePageProps> = (props) => {
  const { data: route } = useRoute({
    fallbackData: props.route,
    id: props.route.id,
  });

  return (
    <>
      <Head>
        <title>{route!.name} | Ciclovía App</title>
      </Head>

      <Typography sx={{ mb: 3 }} variant="h6">
        {route!.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid container item md={4} xs={12} spacing={3}>
          <RouteDetails route={route!} />
        </Grid>

        <Grid item md={8} xs={12} minHeight={500}>
          <RouteMapViewer route={route!} />
        </Grid>
      </Grid>
    </>
  );
};

Route.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Route.auth = {
  roles: Object.values(Roles),
};

Route.getInitialProps = async (context) => {
  const { id } = context.query;
  const route = await context.client.get<RouteModel.SingleRouteResponse>(
    `/route/${id}`
  );

  return { route: route.data };
};

export default Route;
