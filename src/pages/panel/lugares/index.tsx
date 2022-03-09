import {
  DashboardLayout,
  PlaceListResults,
  PlaceListToolbar,
} from "@components";
import { usePlaces, usePlaceTypes } from "@lib";
import { Box, Container } from "@mui/material";
import { PlaceModel, PlaceTypeModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const Places: NextPageWithLayout<PlaceModel.PlacesPageProps> = (props) => {
  const { data: places } = usePlaces(props.places);
  const { data: placeTypes } = usePlaceTypes(props.placeTypes);

  return (
    <>
      <Head>
        <title>Lugares | Ciclovía App</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <PlaceListToolbar />
          <Box sx={{ mt: 3 }}>
            <PlaceListResults places={places} placeTypes={placeTypes!} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Places.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Places.getInitialProps = async (context) => {
  const [places, placeTypes] = await Promise.all([
    context.client.get<PlaceModel.PlaceResponse[]>("/place"),
    context.client.get<PlaceTypeModel.PlaceTypeResponse[]>("/placetype"),
  ]);

  return { places: places.data, placeTypes: placeTypes.data };
};

export default Places;
