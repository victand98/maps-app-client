import axios from "axios";
import { NextPageContext } from "next";
import { SERVER_URI, SERVER_URI_PRIVATE } from ".";

const buildClient = ({ req }: NextPageContext) => {
  console.log("req", req?.headers);
  if (typeof window === "undefined") {
    // We are on the server
    return axios.create({
      baseURL: SERVER_URI_PRIVATE,
      headers: {
        cookie: req?.headers.cookie!,
        "set-cookie": req?.headers["set-cookie"]?.toString()!,
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
