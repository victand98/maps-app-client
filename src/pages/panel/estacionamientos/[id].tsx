import {
  DashboardLayout,
  ParkingPointStandListResults,
  ParkingPointStandListToolbar,
} from "@components";
import { Roles, useParkingPoint } from "@lib";
import { Box, Container } from "@mui/material";
import { ParkingPointModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const ParkingPoint: NextPageWithLayout<
  ParkingPointModel.ParkingPointPageProps
> = (props) => {
  const { data: parkingPoint } = useParkingPoint(props.parkingPoint);

  return (
    <>
      <Head>
        <title>{parkingPoint?.parkingPoint.name} | Ciclovía App</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ParkingPointStandListToolbar
            parkingPoint={parkingPoint!.parkingPoint}
            parkingPointStands={parkingPoint!.parkingPointStands}
          />

          <Box sx={{ mt: 3 }}>
            <ParkingPointStandListResults
              parkingPointStands={parkingPoint!.parkingPointStands}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ParkingPoint.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

ParkingPoint.auth = {
  roles: [Roles.admin],
};

ParkingPoint.getInitialProps = async (context) => {
  const { id } = context.query;
  const [parkingPoint] = await Promise.all([
    context.client.get<ParkingPointModel.SingleParkingPointResponse>(
      `/parkingpoint/${id}`
    ),
  ]);

  return { parkingPoint: parkingPoint.data };
};

export default ParkingPoint;
