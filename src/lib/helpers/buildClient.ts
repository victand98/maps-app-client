import axios from "axios";
import { NextPageContext } from "next";
import { SERVER_URI, SERVER_URI_PRIVATE } from ".";

const buildClient = ({ req }: NextPageContext) => {
  if (typeof window === "undefined") {
    console.log("\nREQ.headers\n", req?.headers);
    const { ...rest } = req?.headers;
    // We are on the server
    const instance = axios.create({
      baseURL: SERVER_URI_PRIVATE,
      withCredentials: true,
      headers: {
        head: rest as any,
      },
    });
    console.log("axios", instance.defaults.headers);
    if (req?.headers.cookie !== undefined)
      instance.defaults.headers.common.cookie = req?.headers.cookie;
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
