import axios, { AxiosError, AxiosResponse } from "axios";
import { SERVER_URI } from "./constants";
import { CustomErrorResponse } from "@types";

const instance = axios.create({
  baseURL: SERVER_URI,
  withCredentials: true,
});

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

export default instance;
