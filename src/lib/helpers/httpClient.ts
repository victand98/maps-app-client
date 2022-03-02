import axios, { AxiosError, AxiosResponse } from "axios";
import { SERVER_URI } from "./constants";
import { CustomErrorResponse } from "@types";

const instance = axios.create();
instance.defaults.baseURL = SERVER_URI;
instance.defaults.withCredentials = true;
instance.defaults.headers.common["sec-fetch-site"] = "cross-site";
instance.defaults.headers.common["sec-fetch-mode"] = "cors";

const responseHandler = (response: AxiosResponse) => {
  return response;
};

const errorHandler = async (error: AxiosError<CustomErrorResponse>) => {
  if (error.response) {
    const { data } = error.response;
    return Promise.reject(data);
  } else if (error.request) {
    return Promise.reject({
      errors: [
        {
          message:
            "No se ha podido establecer comunicación con el servidor, por favor, vuelva a intentarlo.",
        },
      ],
    } as CustomErrorResponse);
  }

  return Promise.reject({
    errors: [
      { message: "Ha ocurrido un error inesperado, vuelva a intentarlo." },
    ],
  } as CustomErrorResponse);
};

instance.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

instance.interceptors.request.use((config) => {
  console.log("config", config);
  return config;
});

export default instance;
