import { IndexLayout } from "@components/Layout";
import { Box } from "@mui/material";
import { HomePage, PlaceModel } from "@types";
import { NextPageWithLayout } from "next";
import dynamic from "next/dynamic";
import React, { ReactElement } from "react";

const MapViewer = dynamic(() => import("@components/Map/MapViewer"), {
  ssr: false,
});

const Home: NextPageWithLayout<HomePage.HomePageProps> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <MapViewer places={props.places} />
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => <IndexLayout>{page}</IndexLayout>;

Home.getInitialProps = async (context) => {
  const [places] = await Promise.all([
    context.client.get<PlaceModel.PlaceResponse[]>("/place"),
  ]);

  return { places: places.data };
};

export default Home;
