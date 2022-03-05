import { DashboardLayout, PlaceTypeForm, PlaceTypeHelper } from "@components";
import { Box, Container, Grid, Typography } from "@mui/material";
import { PlaceTypeModel } from "@types";
import fs from "fs";
import { GetServerSideProps, NextPageWithLayout } from "next";
import Head from "next/head";
import path from "path";
import React, { ReactElement } from "react";

const NewPlaceType: NextPageWithLayout<
  PlaceTypeModel.IPageNewPlaceTypeProps
> = (props) => {
  const { iconOptions } = props;

  return (
    <>
      <Head>
        <title>Nuevo tipo de lugar | Ciclovía App</title>
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
            Nuevo tipo de lugar
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={8} md={6} xs={12}>
              <PlaceTypeForm iconOptions={iconOptions} />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
              <PlaceTypeHelper />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

NewPlaceType.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const iconsPath = path.join(process.cwd(), "src", "lib");
  const fileContent = fs.readFileSync(
    path.join(iconsPath, "codepoints.txt"),
    "utf8"
  );
  const data = fileContent.split("\n");
  const iconOptions = data.map((nameAndCode) => {
    const parts = nameAndCode.split(" ");
    return {
      name: parts[0],
      code: parts[1],
    };
  });

  return { props: { iconOptions } };
};

export default NewPlaceType;
