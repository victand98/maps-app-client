import { httpClient } from ".";

export const fetcher = async (url: string) => {
  const { data } = await httpClient.get(url);
  return data;
};
