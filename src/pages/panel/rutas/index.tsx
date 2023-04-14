import {
  DashboardLayout,
  RoutesListResults,
  RoutesListToolbar,
} from "@components";
import { Roles, httpClient, useRoutes } from "@lib";
import { Box } from "@mui/material";
import { RouteModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { ReactElement } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

const Routes: NextPageWithLayout<RouteModel.RoutesPageProps> = (props) => {
  const { data: routes } = useRoutes({
    fallbackData: props.routes,
  });

  return (
    <>
      <Head>
        <title>Rutas | Ciclovía App</title>
      </Head>

      <RoutesListToolbar />

      <Box sx={{ mt: 3 }}>
        <RoutesListResults routes={routes!} />
      </Box>
    </>
  );
};

Routes.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Routes.auth = {
  roles: Object.values(Roles),
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const routes = await httpClient.get<RouteModel.RouteResponse[]>(`/route/`, {
    params: { session },
  });
  return {
    props: {
      session,
      routes: routes.data,
    },
  };
};
export default Routes;
