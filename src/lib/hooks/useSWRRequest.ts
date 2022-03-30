import { httpClient } from "@lib";
import { CustomErrorResponse } from "@types";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    "isValidating" | "error" | "mutate"
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    "fallbackData"
  > {
  fallbackData?: Data;
  execute?: boolean;
}

export default function useSWRRequest<
  Data = unknown,
  Error = CustomErrorResponse
>(
  request: GetRequest,
  { fallbackData, execute = true, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    execute && request && JSON.stringify(request),
    /**
     * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
     * function is actually only called by `useSWR` when it isn't.
     */
    () => httpClient.request<Data>(request!),
    {
      ...config,
      fallbackData: fallbackData && {
        status: 200,
        statusText: "InitialData",
        config: request!,
        headers: {},
        data: fallbackData,
      },
    }
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    mutate,
  };
}

export type SWRParams<Data> = Config<Data, CustomErrorResponse> & {
  id?: string;
};
