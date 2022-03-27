import axios from "axios";
import { GetServerSidePropsContext, NextPageContext, PreviewData } from "next";
import { Session } from "next-auth";
import { ParsedUrlQuery } from "querystring";
import { httpClient, SERVER_URI_PRIVATE } from ".";

const buildClient = (
  ctx: NextPageContext | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  session: Session | null
) => {
  if (typeof window === "undefined") {
    // We are on the server
    const instance = axios.create();
    instance.defaults.baseURL = SERVER_URI_PRIVATE;
    instance.defaults.withCredentials = true;
    if (ctx.req?.headers.cookie)
      instance.defaults.headers.common["cookie"] = ctx.req.headers.cookie;
    if (session)
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${session.accessToken}`;

    return instance;
  } else {
    // We are on the client
    return httpClient;
  }
};

export default buildClient;
