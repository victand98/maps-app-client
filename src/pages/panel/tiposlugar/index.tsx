import {
  DashboardLayout,
  PlaceTypeListResults,
  PlaceTypeListToolbar,
} from "@components";
import { buildClient, getIconOptions, Roles, usePlaceTypes } from "@lib";
import { Box, Container } from "@mui/material";
import { PlaceTypeModel } from "@types";
import { GetServerSideProps, NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const PlaceTypes: NextPageWithLayout<PlaceTypeModel.IPagePlaceTypesProps> = (
  props
) => {
  const { data: placeTypes, mutate } = usePlaceTypes(props.placeTypes);

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
            <PlaceTypeListResults
              placeTypes={placeTypes}
              iconOptions={props.iconOptions!}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

PlaceTypes.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

PlaceTypes.auth = {
  roles: [Roles.admin],
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const iconOptions = getIconOptions();
  const client = await buildClient(context, null);
  const { data: placeTypes } = await client.get<
    PlaceTypeModel.PlaceTypeResponse[]
  >("/placetype");

  return { props: { iconOptions, placeTypes } };
};

export default PlaceTypes;
