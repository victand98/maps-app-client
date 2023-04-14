import { DefaultLayout, Link, LoginForm } from "@components";
import { Avatar, Box, Typography, Link as MaterialLink } from "@mui/material";
import { GetServerSideProps, NextPageWithLayout } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React, { ReactElement } from "react";
import { AiFillLock } from "react-icons/ai";

const Login: NextPageWithLayout<{}> = () => {
  return (
    <>
      <Head>
        <title>Ingresar | Ciclovía App</title>
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
          <AiFillLock />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingreso al Sistema
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="body2">
          Utiliza tus credenciales de acceso
        </Typography>
        <LoginForm />
        <Typography color="textSecondary" variant="body2">
          ¿No tienes una cuenta?{" "}
          <Link href="/registrarse" passHref withAnchor={false}>
            <MaterialLink variant="subtitle2" underline="hover">
              Regístrate
            </MaterialLink>
          </Link>
        </Typography>
      </Box>
    </>
  );
};

Login.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx });
  const { returnUrl = "/panel" } = ctx.query;
  if (session) {
    return {
      redirect: {
        destination: returnUrl.toString(),
        permanent: false,
      },
    };
  }
  return { props: { session } };
};

export default Login;
