import axios, { AxiosRequestHeaders } from "axios";
import { NextPageContext } from "next";
import { SERVER_URI, SERVER_URI_PRIVATE } from ".";

const buildClient = ({ req }: NextPageContext) => {
  console.log("\nREQ.HEADERS\n", req?.headers);
  if (typeof window === "undefined") {
    // We are on the server
    const instance = axios.create({
      baseURL: SERVER_URI_PRIVATE,
      headers: req?.headers as any,
      withCredentials: true,
    });
    // if (req?.headers.cookie !== undefined)
    //   instance.defaults.headers.common = req?.headers as AxiosRequestHeaders;
    return instance;
  } else {
    // We are on the client
    return axios.create({
      baseURL: SERVER_URI,
      withCredentials: true,
    });
  }
};

export default buildClient;
