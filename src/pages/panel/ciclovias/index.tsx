import {
  BikewayListResults,
  BikewayListToolbar,
  DashboardLayout,
} from "@components";
import { Roles, useBikeways } from "@lib";
import { Box } from "@mui/material";
import { BikewayModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const Bikeways: NextPageWithLayout<BikewayModel.BikewaysPageProps> = (
  props
) => {
  const { data: bikeways } = useBikeways(props.bikeways);

  return (
    <>
      <Head>
        <title>Ciclovías | Ciclovía App</title>
      </Head>

      <BikewayListToolbar />
      <Box sx={{ mt: 3 }}>
        <BikewayListResults bikeways={bikeways} />
      </Box>
    </>
  );
};

Bikeways.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Bikeways.getInitialProps = async (context) => {
  const bikeways = await context.client.get<BikewayModel.BikewayResponse[]>(
    "/bikeway"
  );
  return { bikeways: bikeways.data };
};

Bikeways.auth = {
  roles: [Roles.admin],
};

export default Bikeways;
