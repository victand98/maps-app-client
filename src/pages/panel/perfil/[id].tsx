import { DashboardLayout, ProfileCard, ProfileDetails } from "@components";
import { Roles, httpClient, useUser } from "@lib";
import { Grid, Typography } from "@mui/material";
import { UserModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { ReactElement } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

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
    </>
  );
};

Profile.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Profile.auth = {
  roles: Object.values(Roles),
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const { id } = ctx.query;
  const user = await httpClient.get<UserModel.UserResponse>(`/user/${id}`, {
    params: { session },
  });

  return {
    props: {
      session,
      profile: user.data,
    },
  };
};

export default Profile;
