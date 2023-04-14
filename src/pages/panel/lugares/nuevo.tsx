import { DashboardLayout, PlaceForm, PlacePreview } from "@components";
import { Roles, httpClient } from "@lib";
import { Grid, Typography } from "@mui/material";
import { PlaceModel, PlaceTypeModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { ReactElement } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const { data: placeTypes } = await httpClient.get<
    PlaceTypeModel.PlaceTypeResponse[]
  >("/placetype", { params: { session } });

  return {
    props: {
      session,
      placeTypes,
    },
  };
};

export default NewPlace;
