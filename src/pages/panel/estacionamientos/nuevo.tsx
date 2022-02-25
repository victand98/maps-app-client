import {
  ParkingPointForm,
  ParkingPointPreview,
  DashboardLayout,
} from "@components";
import { Box, Container, Grid, Typography } from "@mui/material";
import { ParkingPointModel, PlaceTypeModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const NewParkingPoint: NextPageWithLayout<
  ParkingPointModel.IPageNewParkingPointProps
> = (props) => {
  return (
    <>
      <Head>
        <title>Nuevo punto de estacionamiento | Ciclovía App</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Nuevo punto de estacionamiento
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <ParkingPointPreview />
            </Grid>

            <Grid item lg={8} md={6} xs={12}>
              <ParkingPointForm placeTypes={props.placeTypes} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

NewParkingPoint.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

NewParkingPoint.getInitialProps = async (context) => {
  const { data: placeTypes } = await context.client.get<
    PlaceTypeModel.PlaceTypeResponse[]
  >("/placetype");

  return { placeTypes };
};

export default NewParkingPoint;
