import useSWRRequest from "@lib/hooks/useSWRRequest";
import { ParkingPointModel } from "@types";

export const useParkingPoints = (
  fallbackData?: ParkingPointModel.ParkingPointResponse[]
) => {
  const parkingPoints = useSWRRequest<ParkingPointModel.ParkingPointResponse[]>(
    { url: "/parkingpoint" },
    { fallbackData }
  );

  return parkingPoints;
};
