import { CustomErrorResponse } from "@types";
import { useState } from "react";

interface Props<Response, Properties extends any[], Values> {
  request: (...args: Properties) => Promise<Response>;
  onSuccess?: (response: Response) => void;
  onError?: (err: CustomErrorResponse<Values>) => void;
}

export const useRequest = <
  Response,
  Properties extends any[],
  Values = Properties[0]
>(
  props: Props<Response, Properties, Values>
) => {
  const [error, setError] = useState<CustomErrorResponse<Values>>();
  const [response, setResponse] = useState<Response>();
  const [loading, setLoading] = useState(false);

  const doRequest = async (...args: Parameters<typeof props.request>) => {
    try {
      setLoading(true);
      setError(undefined);
      setResponse(undefined);
      const resp = await props.request(...args);
      setResponse(resp);
      if (props.onSuccess) props.onSuccess(resp);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err as CustomErrorResponse<Values>);
      if (props.onError) props.onError(err as CustomErrorResponse<Values>);
      setLoading(false);
    }
  };

  return { doRequest, error, response, loading };
};
