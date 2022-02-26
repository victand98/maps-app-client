import {
  DashboardLayout,
  ParkingPointCard,
  ParkingPointListToolbar,
} from "@components";
import { useParkingPoints } from "@lib";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { ParkingPointModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const ParkingPoints: NextPageWithLayout<
  ParkingPointModel.IPageParkingPointsProps
> = (props) => {
  const { data: parkingPoints } = useParkingPoints(props.parkingPoints);

  return (
    <>
      <Head>
        <title>Puntos de estacionamiento | Ciclovía App</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ParkingPointListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {parkingPoints?.map((parkingPoint) => (
                <Grid item key={parkingPoint.id} lg={4} md={6} xs={12}>
                  <ParkingPointCard parkingPoint={parkingPoint} />
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box> */}
        </Container>
      </Box>
    </>
  );
};

ParkingPoints.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

ParkingPoints.getInitialProps = async (context) => {
  const { data: parkingPoints } = await context.client.get<
    ParkingPointModel.ParkingPointResponse[]
  >("/parkingpoint");

  return { parkingPoints };
};

export default ParkingPoints;
