import { BikewayEditForm, DashboardLayout } from "@components";
import { Roles, httpClient } from "@lib";
import { Grid, Typography } from "@mui/material";
import { BikewayModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ReactElement } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

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
    </>
  );
};

Bikeway.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Bikeway.auth = {
  roles: [Roles.admin],
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const { id } = ctx.query;
  const bikeway = await httpClient.get<BikewayModel.BikewayResponse>(
    `/bikeway/${id}`,
    { params: { session } }
  );

  return {
    props: {
      session,
      bikeway: bikeway.data,
    },
  };
};

export default Bikeway;
