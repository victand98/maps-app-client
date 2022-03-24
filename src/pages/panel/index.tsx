import { DashboardLayout } from "@components";
import { Roles } from "@lib";
import Head from "next/head";
import React, { ReactElement } from "react";

const Home = () => {
  return (
    <>
      <Head>
        <title>Panel | Ciclovía App</title>
      </Head>
      <div>Panel Principal</div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

Home.auth = {
  roles: [Roles.admin, Roles.cyclist],
};

export default Home;
