import { DashboardLayout, RouteDetails } from "@components";
import { Roles, httpClient, useRoute } from "@lib";
import { Grid, Typography } from "@mui/material";
import { RouteModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ReactElement } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

const RouteMapViewer = dynamic(
  () => import("@components/Route/RouteMapViewer"),
  {
    ssr: false,
  }
);

const Route: NextPageWithLayout<RouteModel.RoutePageProps> = (props) => {
  const { data: route } = useRoute({
    fallbackData: props.route,
    id: props.route.id,
  });

  return (
    <>
      <Head>
        <title>{route!.name} | Ciclovía App</title>
      </Head>

      <Typography sx={{ mb: 3 }} variant="h6">
        {route!.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid container item md={4} xs={12} spacing={3}>
          <RouteDetails route={route!} />
        </Grid>

        <Grid item md={8} xs={12} minHeight={500}>
          <RouteMapViewer route={route!} />
        </Grid>
      </Grid>
    </>
  );
};

Route.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Route.auth = {
  roles: Object.values(Roles),
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const { id } = ctx.query;
  const route = await httpClient.get<RouteModel.SingleRouteResponse>(
    `/route/${id}`,
    { params: { session } }
  );

  return {
    props: {
      session,
      route: route.data,
    },
  };
};

export default Route;
