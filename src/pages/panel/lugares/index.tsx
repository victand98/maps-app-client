import {
  DashboardLayout,
  PlaceListResults,
  PlaceListToolbar,
} from "@components";
import { Roles, usePlaces, usePlaceTypes } from "@lib";
import { Box } from "@mui/material";
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

      <PlaceListToolbar />
      <Box sx={{ mt: 3 }}>
        <PlaceListResults places={places} placeTypes={placeTypes!} />
      </Box>
    </>
  );
};

Places.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Places.auth = {
  roles: [Roles.admin],
};

Places.getInitialProps = async (context) => {
  const [places, placeTypes] = await Promise.all([
    context.client.get<PlaceModel.PlaceResponse[]>("/place"),
    context.client.get<PlaceTypeModel.PlaceTypeResponse[]>("/placetype"),
  ]);

  return { places: places.data, placeTypes: placeTypes.data };
};

export default Places;
