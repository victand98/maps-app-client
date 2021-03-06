import {
  ChangePasswordForm,
  DashboardLayout,
  ProfileCard,
  ProfileForm,
} from "@components";
import { Roles, useUser } from "@lib";
import { Grid, Typography } from "@mui/material";
import { UserModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const MyProfile: NextPageWithLayout<UserModel.MyProfilePageProps> = (props) => {
  const { data: profile } = useUser({
    fallbackData: props.profile,
    id: props?.profile?.id,
  });

  return (
    <>
      <Head>
        <title>Mi perfil | Ciclovía App</title>
      </Head>

      <Typography sx={{ mb: 3 }} variant="h4">
        Mi perfil
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <ProfileCard profile={profile!} />
        </Grid>

        <Grid item container lg={8} md={6} xs={12} spacing={3}>
          <Grid item xs={12}>
            <ProfileForm profile={profile!} />
          </Grid>
          <Grid item xs={12}>
            <ChangePasswordForm />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

MyProfile.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

MyProfile.auth = {
  roles: Object.values(Roles),
};

MyProfile.getInitialProps = async (context) => {
  const { session } = context;

  if (session) {
    const user = await context.client.get<UserModel.UserResponse>(
      `/user/${session!.user!.id}`
    );
    return { profile: user.data };
  }

  return {};
};

export default MyProfile;
