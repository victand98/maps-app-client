import { DashboardLayout, UserListResults, UserListToolbar } from "@components";
import { Roles, httpClient, useUsers } from "@lib";
import { Box } from "@mui/material";
import { UserModel } from "@types";
import { GetServerSidePropsContext, NextPageWithLayout } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { ReactElement } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const users = await httpClient.get<UserModel.UserResponse[]>("/user", {
    params: { session },
  });

  return {
    props: {
      session,
      users: users.data,
    },
  };
};

export default Users;
