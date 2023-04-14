import {
  DashboardLayout,
  PlaceListResults,
  PlaceListToolbar,
} from "@components";
import { Roles, httpClient, usePlaceTypes, usePlaces } from "@lib";
import { Box } from "@mui/material";
import { PlaceModel, PlaceTypeModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { ReactElement } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const [places, placeTypes] = await Promise.all([
    httpClient.get<PlaceModel.PlaceResponse[]>("/place", {
      params: { session },
    }),
    httpClient.get<PlaceTypeModel.PlaceTypeResponse[]>("/placetype", {
      params: { session },
    }),
  ]);

  return {
    props: {
      session,
      places: places.data,
      placeTypes: placeTypes.data,
    },
  };
};

export default Places;
