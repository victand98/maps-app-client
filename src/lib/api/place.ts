import useSWRRequest from "@lib/hooks/useSWRRequest";
import { PlaceModel } from "@types";

export const usePlaces = (fallbackData?: PlaceModel.PlaceResponse[]) => {
  const places = useSWRRequest<PlaceModel.PlaceResponse[]>(
    { url: "/place" },
    { fallbackData }
  );

  return places;
};
