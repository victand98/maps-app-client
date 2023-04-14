import {
  ChangePasswordForm,
  DashboardLayout,
  ProfileCard,
  ProfileForm,
} from "@components";
import { Roles, httpClient, useUser } from "@lib";
import { Grid, Typography } from "@mui/material";
import { UserModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { ReactElement } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session) {
    const user = await httpClient.get<UserModel.UserResponse>(
      `/user/${session!.user!.id}`,
      { params: { session } }
    );
    return { props: { session, profile: user.data } };
  }

  return { props: { session } };
};

export default MyProfile;
