import axios from "axios";
import { NextPageContext } from "next";
import { SERVER_URI, SERVER_URI_PRIVATE } from ".";

const buildClient = ({ req }: NextPageContext) => {
  console.log("\nreq.headers\n", req?.headers);
  if (typeof window === "undefined") {
    // We are on the server
    return axios.create({
      baseURL: SERVER_URI_PRIVATE,
      headers: {
        cookie: req?.headers.cookie!,
      },
    });
  } else {
    // We are on the client
    return axios.create({
      baseURL: SERVER_URI,
      withCredentials: true,
    });
  }
};

export default buildClient;
