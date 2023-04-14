import { Link, ErrorLayout } from "@components";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const Error: NextPageWithLayout<{ statusCode?: number }> = (props) => {
  return (
    <>
      <Head>
        <title>{props.statusCode} | Ciclovía App</title>
      </Head>

      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography align="center" color="textPrimary" variant="h1">
          {props.statusCode}: Ha ocurrido un error interno del sistema
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          Se ha producido un error inesperado. Lo sentimos, por favor vuelve a
          intentarlo en unos segundos.
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <img
            alt="Under development"
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

Error.defaultProps = {
  statusCode: 500,
};

Error.getLayout = (page: ReactElement) => <ErrorLayout>{page}</ErrorLayout>;

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
