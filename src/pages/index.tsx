import { IndexLayout } from "@components/Layout";
import { RouteOverview } from "@components/Route";
import { httpClient, useCurrentRoute } from "@lib";
import { Box } from "@mui/material";
import { BikewayModel, HomePage, PlaceModel, RouteModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { ReactElement } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

const MapViewer = dynamic(() => import("@components/Map/MapViewer"), {
  ssr: false,
});

const Home: NextPageWithLayout<HomePage.HomePageProps> = (props) => {
  const { data: session } = useSession();
  const { data: currentRoute } = useCurrentRoute({
    execute: !!session,
    fallbackData: props.currentRoute,
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <MapViewer
        places={props.places}
        bikeways={props.bikeways}
        currentRoute={currentRoute}
      />
      <RouteOverview currentRoute={currentRoute} />
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => <IndexLayout>{page}</IndexLayout>;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  let currentRoute: HomePage.HomePageProps["currentRoute"] | null = null;

  if (session) {
    const { data } = await httpClient.get<RouteModel.NewRouteResponse>(
      "/route/current",
      { params: { session } }
    );
    currentRoute = data;
  }

  const [places, bikeways] = await Promise.all([
    httpClient.get<PlaceModel.PlaceResponse[]>("/place"),
    httpClient.get<BikewayModel.BikewayResponse[]>("/bikeway"),
  ]);

  return {
    props: {
      session,
      places: places.data,
      bikeways: bikeways.data,
      currentRoute,
    },
  };
};

export default Home;
