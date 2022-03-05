import { AxiosResponse } from "axios";
import { useState } from "react";
import { CustomErrorResponse } from "@types";

interface Props<T, E> {
  request: (data: any) => Promise<AxiosResponse<T>>;
  onSuccess?: (data: T) => void;
  onError?: (err: CustomErrorResponse<E>) => void;
}

export const useRequest = <T, E = undefined>(props: Props<T, E>) => {
  const [error, setError] = useState<CustomErrorResponse<E>>();
  const [response, setResponse] = useState<AxiosResponse<T>>();

  const doRequest = async (data?: any) => {
    try {
      setError(undefined);
      setResponse(undefined);
      const resp = await props.request(data);
      setResponse(resp);
      if (props.onSuccess) props.onSuccess(resp.data);
    } catch (err) {
      setError(err as CustomErrorResponse<E>);
      if (props.onError) props.onError(err as CustomErrorResponse<E>);
    }
  };

  return { doRequest, error, response };
};
