import { DashboardLayout, UserListResults, UserListToolbar } from "@components";
import { Roles, useUsers } from "@lib";
import { Box } from "@mui/material";
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

      <UserListToolbar />
      <Box sx={{ mt: 3 }}>
        <UserListResults users={users} />
      </Box>
    </>
  );
};

Users.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Users.auth = {
  roles: [Roles.admin],
};

Users.getInitialProps = async (context) => {
  const users = await context.client.get<UserModel.UserResponse[]>("/user");

  return { users: users.data };
};

export default Users;
