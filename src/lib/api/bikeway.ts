import useSWRRequest from "@lib/hooks/useSWRRequest";
import { BikewayModel } from "@types";

export const useBikeways = (fallbackData?: BikewayModel.BikewayResponse[]) => {
  const bikeways = useSWRRequest<BikewayModel.BikewayResponse[]>(
    { url: "/bikeway" },
    { fallbackData }
  );

  return bikeways;
};
