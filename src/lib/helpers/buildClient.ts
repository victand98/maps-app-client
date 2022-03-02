import axios from "axios";
import { NextPageContext } from "next";
import { httpClient, SERVER_URI_PRIVATE } from ".";

const buildClient = ({ req }: NextPageContext) => {
  if (typeof window === "undefined") {
    // We are on the server
    const instance = axios.create();
    instance.defaults.baseURL = SERVER_URI_PRIVATE;
    instance.defaults.withCredentials = true;

    if (req?.headers.cookie) {
      console.log("\nCOOKIE\n", req?.headers.cookie);
      instance.defaults.headers.common["cookie"] = req?.headers.cookie;
    }

    console.log("instance", instance);
    return instance;
  } else {
    // We are on the client
    console.log("httpClient", httpClient);
    return httpClient;
  }
};

export default buildClient;
