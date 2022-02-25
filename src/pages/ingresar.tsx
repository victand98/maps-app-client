import { DefaultLayout, LoginForm } from "@components";
import { Avatar, Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { AiFillLock } from "react-icons/ai";

const Login = () => {
  return (
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
      <LoginForm />
    </Box>
  );
};

Login.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;

export default Login;
