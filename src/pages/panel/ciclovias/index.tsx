import {
  BikewayListResults,
  BikewayListToolbar,
  DashboardLayout,
} from "@components";
import { Roles, httpClient, useBikeways } from "@lib";
import { Box } from "@mui/material";
import { BikewayModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { ReactElement } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

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

Bikeways.auth = {
  roles: [Roles.admin],
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const bikeways = await httpClient.get<BikewayModel.BikewayResponse[]>(
    "/bikeway",
    { params: { session } }
  );

  return {
    props: {
      session,
      bikeways: bikeways.data,
    },
  };
};

export default Bikeways;
