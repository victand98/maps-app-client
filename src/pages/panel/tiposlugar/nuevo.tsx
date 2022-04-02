import { DashboardLayout, PlaceTypeForm, PlaceTypeHelper } from "@components";
import { getIconOptions, Roles } from "@lib";
import { Grid, Typography } from "@mui/material";
import { PlaceTypeModel } from "@types";
import { GetServerSideProps, NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const NewPlaceType: NextPageWithLayout<
  PlaceTypeModel.IPageNewPlaceTypeProps
> = (props) => {
  const { iconOptions } = props;

  return (
    <>
      <Head>
        <title>Nuevo tipo de lugar | Ciclovía App</title>
      </Head>

      <Typography sx={{ mb: 3 }} variant="h4">
        Nuevo tipo de lugar
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={8} md={6} xs={12}>
          <PlaceTypeForm iconOptions={iconOptions} />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <PlaceTypeHelper />
        </Grid>
      </Grid>
    </>
  );
};

NewPlaceType.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

NewPlaceType.auth = {
  roles: [Roles.admin],
};

export const getServerSideProps: GetServerSideProps = async () => {
  const iconOptions = getIconOptions();
  return { props: { iconOptions } };
};

export default NewPlaceType;
