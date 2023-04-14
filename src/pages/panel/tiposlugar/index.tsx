import {
  DashboardLayout,
  PlaceTypeListResults,
  PlaceTypeListToolbar,
} from "@components";
import { Roles, getIconOptions, httpClient, usePlaceTypes } from "@lib";
import { Box } from "@mui/material";
import { PlaceTypeModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { ReactElement } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

const PlaceTypes: NextPageWithLayout<PlaceTypeModel.IPagePlaceTypesProps> = (
  props
) => {
  const { data: placeTypes, mutate } = usePlaceTypes(props.placeTypes);

  return (
    <>
      <Head>
        <title>Tipos de lugar | Ciclovía App</title>
      </Head>

      <PlaceTypeListToolbar />
      <Box sx={{ mt: 3 }}>
        <PlaceTypeListResults
          placeTypes={placeTypes}
          iconOptions={props.iconOptions!}
        />
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const iconOptions = getIconOptions();
  const { data: placeTypes } = await httpClient.get<
    PlaceTypeModel.PlaceTypeResponse[]
  >("/placetype", { params: { session } });

  return {
    props: {
      session,
      iconOptions,
      placeTypes,
    },
  };
};

export default PlaceTypes;
