import { DashboardLayout, UserListResults, UserListToolbar } from "@components";
import { useUsers } from "@lib";
import { Box, Container } from "@mui/material";
import { UserModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const Users: NextPageWithLayout<UserModel.UsersPageProps> = (props) => {
  const { data: users } = useUsers(props.users);

  return (
    <>
      <Head>
        <title>Usuarios | Ciclovía App</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <UserListToolbar />
          <Box sx={{ mt: 3 }}>
            <UserListResults users={users} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Users.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Users.getInitialProps = async (context) => {
  const users = await context.client.get<UserModel.UserResponse[]>("/user");

  return { users: users.data };
};

export default Users;
