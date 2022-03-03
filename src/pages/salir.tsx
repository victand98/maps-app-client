import { DefaultLayout } from "@components";
import { AuthService } from "@lib";
import { MeetingRoom } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  const logout = useCallback(async () => {
    await AuthService.logout();
    const data = await signOut<any>({
      callbackUrl: "/ingresar",
      redirect: false,
    });
    if (data?.url) router.push(data.url);
  }, [router]);

  useEffect(() => {
    logout();
  }, [logout]);

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
        <MeetingRoom />
      </Avatar>
      <Typography component="h2" variant="h5">
        Saliendo...
      </Typography>
    </Box>
  );
};

Logout.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default Logout;
