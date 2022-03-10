import { BikewayEditForm, DashboardLayout } from "@components";
import { Box, Container, Grid, Typography } from "@mui/material";
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

const Bikeway: NextPageWithLayout<BikewayModel.BikewayPageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Editar Ciclovía | Ciclovía App</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4">Editar Ciclovía</Typography>
          <Typography sx={{ mb: 3 }} variant="subtitle1" color="GrayText">
            {props.bikeway.name}
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={8} md={12} xs={12}>
              <MapBikewayDrawer geometry={props.bikeway.location} />
            </Grid>

            <Grid item lg={4} md={12} xs={12}>
              <BikewayEditForm currentBikeway={props.bikeway} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Bikeway.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Bikeway.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const bikeway = await ctx.client.get<BikewayModel.BikewayResponse>(
    `/bikeway/${id}`
  );
  return { bikeway: bikeway.data };
};

export default Bikeway;
