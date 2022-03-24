import { Link, ErrorLayout } from "@components";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const NotAuthorized: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>No Autorizado | Ciclovía App</title>
      </Head>

      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography align="center" color="textPrimary" variant="h1">
          403: No Autorizado
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          O bien has intentado una ruta sospechosa o has llegado aquí por error.
          Sea lo que sea, intenta usar la navegación
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <img
            alt="403"
            src="/images/404.svg"
            style={{
              marginTop: 50,
              display: "inline-block",
              maxWidth: "100%",
              width: 560,
            }}
          />
        </Box>
        <Link href="/" passHref withAnchor={false}>
          <Button
            component="a"
            startIcon={<ArrowBack fontSize="small" />}
            sx={{ mt: 3 }}
            variant="contained"
          >
            Volver a la página principal
          </Button>
        </Link>
      </Box>
    </>
  );
};

NotAuthorized.getLayout = (page: ReactElement) => (
  <ErrorLayout>{page}</ErrorLayout>
);

export default NotAuthorized;
