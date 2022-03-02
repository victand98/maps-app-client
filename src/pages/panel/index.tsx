import { DashboardLayout } from "@components";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { ReactElement } from "react";

const Home = () => {
  const { data } = useSession();
  console.log("data", data);
  return <div></div>;
};

Home.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};

export default Home;
