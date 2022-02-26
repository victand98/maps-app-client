import { DashboardLayout } from "@components";
import React, { ReactElement } from "react";

const Home = () => {
  return <div></div>;
};

Home.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Home;
