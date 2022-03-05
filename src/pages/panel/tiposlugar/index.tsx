import {
  DashboardLayout,
  PlaceTypeListResults,
  PlaceTypeListToolbar,
} from "@components";
import { usePlaceTypes } from "@lib";
import { Box, Container } from "@mui/material";
import { PlaceTypeModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const PlaceTypes: NextPageWithLayout<PlaceTypeModel.IPagePlaceTypesProps> = (
  props
) => {
  const { data: placeTypes } = usePlaceTypes(props.placeTypes);

  return (
    <>
      <Head>
        <title>Tipos de lugar | Ciclovía App</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <PlaceTypeListToolbar />
          <Box sx={{ mt: 3 }}>
            <PlaceTypeListResults placeTypes={placeTypes} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

PlaceTypes.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

PlaceTypes.getInitialProps = async (context) => {
  const { data: placeTypes } = await context.client.get<
    PlaceTypeModel.PlaceTypeResponse[]
  >("/placetype");

  return { placeTypes };
};

export default PlaceTypes;
