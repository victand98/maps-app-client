import { BikewayForm, DashboardLayout } from "@components";
import { Roles } from "@lib";
import { Grid, Typography } from "@mui/material";
import { BikewayModel } from "@types";
import { NextPageWithLayout } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { ReactElement } from "react";

const MapBikewayDrawer = dynamic(
  () => import("@components/Map/MapBikewayDrawer"),
  {
    ssr: false,
  }
);

const NewBikeway: NextPageWithLayout<BikewayModel.NewBikewayPageProps> = (
  props
) => {
  return (
    <>
      <Head>
        <title>Nueva Ciclovía | Ciclovía App</title>
      </Head>

      <Typography sx={{ mb: 3 }} variant="h4">
        Nueva Ciclovía
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={8} md={12} xs={12}>
          <MapBikewayDrawer />
        </Grid>

        <Grid item lg={4} md={12} xs={12}>
          <BikewayForm />
        </Grid>
      </Grid>
    </>
  );
};

NewBikeway.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

NewBikeway.auth = {
  roles: [Roles.admin],
};

export default NewBikeway;
