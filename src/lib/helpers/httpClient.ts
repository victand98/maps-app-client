import { CustomErrorResponse } from "@types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Session } from "next-auth";
import { SERVER_URI } from "./constants";

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

instance.interceptors.request.use((config) => {
  const session: Session | undefined = config.params?.session;
  const token: string | undefined = session?.accessToken;
  if (token) config.headers!.Authorization = `Bearer ${token}`;
  delete config.params?.session;
  return config;
});

export default instance;
