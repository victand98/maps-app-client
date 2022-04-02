import { DashboardLayout, PlaceForm, PlacePreview } from "@components";
import { Roles } from "@lib";
import { Grid, Typography } from "@mui/material";
import { PlaceModel, PlaceTypeModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const NewPlace: NextPageWithLayout<PlaceModel.NewPlacePageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Nuevo lugar | Ciclovía App</title>
      </Head>

      <Typography sx={{ mb: 3 }} variant="h4">
        Nuevo Lugar
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <PlacePreview />
        </Grid>

        <Grid item lg={8} md={6} xs={12}>
          <PlaceForm placeTypes={props.placeTypes} />
        </Grid>
      </Grid>
    </>
  );
};

NewPlace.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

NewPlace.auth = {
  roles: [Roles.admin],
};

NewPlace.getInitialProps = async (context) => {
  const { data: placeTypes } = await context.client.get<
    PlaceTypeModel.PlaceTypeResponse[]
  >("/placetype");

  return { placeTypes };
};

export default NewPlace;
