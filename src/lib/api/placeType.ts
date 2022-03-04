import useSWRRequest from "@lib/hooks/useSWRRequest";
import { PlaceTypeModel } from "@types";

export const usePlaceTypes = (
  fallbackData?: PlaceTypeModel.PlaceTypeResponse[]
) => {
  const placeTypes = useSWRRequest<PlaceTypeModel.PlaceTypeResponse[]>(
    { url: "/placetype" },
    { fallbackData }
  );

  return placeTypes;
};
