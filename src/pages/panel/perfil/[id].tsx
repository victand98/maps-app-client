import { DashboardLayout, ProfileCard, ProfileDetails } from "@components";
import { Roles, useUser } from "@lib";
import { Box, Container, Grid, Typography } from "@mui/material";
import { UserModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const Profile: NextPageWithLayout<UserModel.ProfilePageProps> = (props) => {
  const { data: profile } = useUser({
    fallbackData: props.profile,
    id: props.profile.id,
  });

  return (
    <>
      <Head>
        <title>
          {profile!.firstName} {profile!.lastName} | Ciclovía App
        </title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            {profile!.firstName} {profile!.lastName}
          </Typography>

          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <ProfileCard profile={profile!} />
            </Grid>

            <Grid item lg={8} md={6} xs={12}>
              <ProfileDetails profile={profile!} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Profile.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Profile.auth = {
  roles: Object.values(Roles),
};

Profile.getInitialProps = async (context) => {
  const { id } = context.query;
  const user = await context.client.get<UserModel.UserResponse>(`/user/${id}`);

  return { profile: user.data };
};

export default Profile;
