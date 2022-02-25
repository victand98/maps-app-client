import { AxiosInstance } from "axios";
import "next";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { CurrentUser } from "./Login";

declare module "next" {
  export interface NextPageContext {
    client: AxiosInstance;
    currentUser?: CurrentUser["currentUser"];
  }

  export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}
