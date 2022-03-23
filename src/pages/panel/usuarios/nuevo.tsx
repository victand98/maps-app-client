import { DashboardLayout, UserForm, UserPreview } from "@components";
import { Box, Container, Grid, Typography } from "@mui/material";
import { UserModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const NewUser: NextPageWithLayout<UserModel.NewUserPageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Nuevo Usuario | Ciclovía App</title>
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
            Nuevo Usuario
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <UserPreview />
            </Grid>

            <Grid item lg={8} md={6} xs={12}>
              <UserForm />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

NewUser.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default NewUser;
