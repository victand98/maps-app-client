import { DefaultLayout, Link, SignupForm } from "@components";
import { HowToReg } from "@mui/icons-material";
import { Avatar, Box, Link as MaterialLink, Typography } from "@mui/material";
import { GetServerSideProps, NextPageWithLayout } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React, { ReactElement } from "react";

const Signup: NextPageWithLayout<{}> = () => {
  return (
    <>
      <Head>
        <title>Registrarse | Ciclovía App</title>
      </Head>

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <HowToReg />
        </Avatar>
        <Typography component="h1" variant="h5">
          Nuevo Registro
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="body2">
          Llena los siguientes datos para obtener una cuenta
        </Typography>
        <SignupForm />
        <Typography color="textSecondary" variant="body2">
          ¿Ya posees una cuenta?{" "}
          <Link href="/ingresar" passHref withAnchor={false}>
            <MaterialLink variant="subtitle2" underline="hover">
              Ingresa ahora
            </MaterialLink>
          </Link>
        </Typography>
      </Box>
    </>
  );
};

Signup.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { returnUrl = "/panel" } = query;
  if (session) {
    return {
      redirect: {
        destination: returnUrl.toString(),
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Signup;
