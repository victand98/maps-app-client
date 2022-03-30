import { IndexLayout } from "@components/Layout";
import { RouteOverview } from "@components/Route";
import { useCurrentRoute } from "@lib";
import { Box } from "@mui/material";
import { BikewayModel, HomePage, PlaceModel, RouteModel } from "@types";
import { NextPageWithLayout } from "next";
import dynamic from "next/dynamic";
import React, { ReactElement } from "react";

const MapViewer = dynamic(() => import("@components/Map/MapViewer"), {
  ssr: false,
});

const Home: NextPageWithLayout<HomePage.HomePageProps> = (props) => {
  const { data: currentRoute } = useCurrentRoute({
    execute: !!props.currentRoute,
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

Home.getInitialProps = async (context) => {
  let currentRoute: HomePage.HomePageProps["currentRoute"];

  if (context.session) {
    const { data } = await context.client.get<RouteModel.NewRouteResponse>(
      "/route/current"
    );
    currentRoute = data;
  }

  const [places, bikeways] = await Promise.all([
    context.client.get<PlaceModel.PlaceResponse[]>("/place"),
    context.client.get<BikewayModel.BikewayResponse[]>("/bikeway"),
  ]);

  return { places: places.data, bikeways: bikeways.data, currentRoute };
};

export default Home;
