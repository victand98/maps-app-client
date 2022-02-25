import { AxiosResponse } from "axios";
import { useState } from "react";
import { CustomErrorResponse } from "@types";

interface Props<T> {
  request: (data: any) => Promise<AxiosResponse<T>>;
  onSuccess?: (data: T) => void;
  onError?: (err: CustomErrorResponse) => void;
}

export const useRequest = <T>(props: Props<T>) => {
  const [error, setError] = useState<CustomErrorResponse>();
  const [response, setResponse] = useState<AxiosResponse<T>>();

  const doRequest = async (data?: any) => {
    try {
      setError(undefined);
      setResponse(undefined);
      const resp = await props.request(data);
      setResponse(resp);
      if (props.onSuccess) props.onSuccess(resp.data);
    } catch (err) {
      setError(err as CustomErrorResponse);
      if (props.onError) props.onError(err as CustomErrorResponse);
    }
  };

  return { doRequest, error, response };
};
