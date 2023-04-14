import { Roles } from "@lib";
import { AxiosInstance } from "axios";
import "next";
import { NextPage } from "next";
import { Session } from "next-auth";
import { ReactElement, ReactNode } from "react";

declare module "next" {
  export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
    auth?: { roles: Roles[] };
  };
}
