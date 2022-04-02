import { DashboardLayout, UserForm, UserPreview } from "@components";
import { Roles, useRoles } from "@lib";
import { Grid, Typography } from "@mui/material";
import { RoleModel, UserModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

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

NewUser.getInitialProps = async (ctx) => {
  const roles = await ctx.client.get<RoleModel.RoleResponse[]>(`/role`);

  return { roles: roles.data };
};

export default NewUser;
