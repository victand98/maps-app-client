import axios from "axios";
import { NextPageContext } from "next";
import { httpClient, SERVER_URI_PRIVATE } from ".";

const buildClient = ({ req }: NextPageContext) => {
  if (typeof window === "undefined") {
    // We are on the server
    console.log("\nREQ.HEADERS\n", req?.headers);
    const instance = axios.create();
    instance.defaults.baseURL = SERVER_URI_PRIVATE;
    instance.defaults.withCredentials = true;
    instance.defaults.headers.common["Content-Type"] = "application/json";

    if (req?.headers.cookie) {
      console.log("\nCOOKIE\n", req?.headers.cookie);
      instance.defaults.headers.common["cookie"] = req?.headers.cookie;
    }

    return instance;
  } else {
    // We are on the client
    return httpClient;
  }
};

export default buildClient;
