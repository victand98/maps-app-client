import {
  DashboardLayout,
  MyRoutesListResults,
  MyRoutesListToolbar,
} from "@components";
import { Roles, httpClient, useMyRoutes } from "@lib";
import { Box } from "@mui/material";
import { RouteModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { ReactElement } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

const MyRoutes: NextPageWithLayout<RouteModel.MyRoutesPageProps> = (props) => {
  const { data: myRoutes } = useMyRoutes({
    fallbackData: props.myRoutes,
  });

  return (
    <>
      <Head>
        <title>Mis rutas | Ciclovía App</title>
      </Head>

      <MyRoutesListToolbar />

      <Box sx={{ mt: 3 }}>
        <MyRoutesListResults myRoutes={myRoutes!} />
      </Box>
    </>
  );
};

MyRoutes.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

MyRoutes.auth = {
  roles: Object.values(Roles),
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const myRoutes = await httpClient.get<RouteModel.RouteResponse[]>(
    `/route/me`,
    { params: { session } }
  );

  return {
    props: {
      session,
      myRoutes: myRoutes.data,
    },
  };
};

export default MyRoutes;
