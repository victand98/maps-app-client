import axios from "axios";
import { getCookies } from "cookies-next";
import { NextPageContext } from "next";
import { httpClient, SERVER_URI_PRIVATE } from ".";

const buildClient = ({ req, res }: NextPageContext) => {
  const cookiesSSR = getCookies({ req, res });
  console.log("cookiesSSR", cookiesSSR);

  if (typeof window === "undefined") {
    // We are on the server
    const instance = axios.create();
    instance.defaults.baseURL = SERVER_URI_PRIVATE;
    instance.defaults.withCredentials = true;

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
