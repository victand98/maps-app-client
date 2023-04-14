import {
  DashboardLayout,
  ParkingPointStandListResults,
  ParkingPointStandListToolbar,
} from "@components";
import { Roles, httpClient, useParkingPoint } from "@lib";
import { Box } from "@mui/material";
import { ParkingPointModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { ReactElement } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

const ParkingPoint: NextPageWithLayout<
  ParkingPointModel.ParkingPointPageProps
> = (props) => {
  const { data: parkingPoint } = useParkingPoint(props.parkingPoint);

  return (
    <>
      <Head>
        <title>{parkingPoint?.parkingPoint.name} | Ciclovía App</title>
      </Head>

      <ParkingPointStandListToolbar
        parkingPoint={parkingPoint!.parkingPoint}
        parkingPointStands={parkingPoint!.parkingPointStands}
      />

      <Box sx={{ mt: 3 }}>
        <ParkingPointStandListResults
          parkingPointStands={parkingPoint!.parkingPointStands}
        />
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const { id } = ctx.query;
  const [parkingPoint] = await Promise.all([
    httpClient.get<ParkingPointModel.SingleParkingPointResponse>(
      `/parkingpoint/${id}`,
      { params: { session } }
    ),
  ]);

  return {
    props: {
      session,
      parkingPoint: parkingPoint.data,
    },
  };
};

export default ParkingPoint;
