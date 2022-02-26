import axios, { AxiosRequestHeaders } from "axios";
import { SERVER_URI } from "./constants";
import { NextPageContext } from "next";

const buildClient = ({ req }: NextPageContext) => {
  if (typeof window === "undefined") {
    // We are on the server
    return axios.create({
      baseURL: SERVER_URI,
      headers: req?.headers as AxiosRequestHeaders,
      withCredentials: true,
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
