import {
  DashboardLayout,
  ParkingPointCard,
  ParkingPointListToolbar,
} from "@components";
import { Roles, useParkingPoints, usePlaceTypes } from "@lib";
import { Box, Grid } from "@mui/material";
import { ParkingPointModel, PlaceTypeModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const ParkingPoints: NextPageWithLayout<
  ParkingPointModel.ParkingPointsPageProps
> = (props) => {
  const { data: parkingPoints } = useParkingPoints(props.parkingPoints);
  const { data: placeTypes } = usePlaceTypes(props.placeTypes);

  return (
    <>
      <Head>
        <title>Puntos de estacionamiento | Ciclovía App</title>
      </Head>

      <ParkingPointListToolbar />
      <Box sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {parkingPoints?.map((parkingPoint) => (
            <Grid item key={parkingPoint.id} lg={4} md={6} xs={12}>
              <ParkingPointCard
                parkingPoint={parkingPoint}
                placeTypes={placeTypes!}
              />
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
    </>
  );
};

ParkingPoints.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

ParkingPoints.auth = {
  roles: [Roles.admin],
};

ParkingPoints.getInitialProps = async (context) => {
  const [parkingPoints, placeTypes] = await Promise.all([
    context.client.get<ParkingPointModel.ParkingPointResponse[]>(
      "/parkingpoint"
    ),
    context.client.get<PlaceTypeModel.PlaceTypeResponse[]>("/placetype"),
  ]);

  return { parkingPoints: parkingPoints.data, placeTypes: placeTypes.data };
};

export default ParkingPoints;
