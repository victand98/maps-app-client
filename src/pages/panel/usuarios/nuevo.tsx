import { DashboardLayout, UserForm, UserPreview } from "@components";
import { Roles, httpClient, useRoles } from "@lib";
import { Grid, Typography } from "@mui/material";
import { RoleModel, UserModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { ReactElement } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

const NewUser: NextPageWithLayout<UserModel.NewUserPageProps> = (props) => {
  const { data: roles } = useRoles({ fallbackData: props.roles });

  return (
    <>
      <Head>
        <title>Nuevo Usuario | Ciclovía App</title>
      </Head>

      <Typography sx={{ mb: 3 }} variant="h4">
        Nuevo Usuario
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <UserPreview />
        </Grid>

        <Grid item lg={8} md={6} xs={12}>
          <UserForm roles={roles!} />
        </Grid>
      </Grid>
    </>
  );
};

NewUser.auth = {
  roles: [Roles.admin],
};

NewUser.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const roles = await httpClient.get<RoleModel.RoleResponse[]>(`/role`, {
    params: { session },
  });

  return {
    props: {
      session,
      roles: roles.data,
    },
  };
};

export default NewUser;
