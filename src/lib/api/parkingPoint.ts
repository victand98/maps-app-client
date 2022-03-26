import useSWRRequest from "@lib/hooks/useSWRRequest";
import { ParkingPointModel } from "@types";
import { useRouter } from "next/router";

export const useParkingPoints = (
  fallbackData?: ParkingPointModel.ParkingPointResponse[]
) => {
  const parkingPoints = useSWRRequest<ParkingPointModel.ParkingPointResponse[]>(
    { url: "/parkingpoint" },
    { fallbackData }
  );

  return parkingPoints;
};

export const useParkingPoint = (
  fallbackData?: ParkingPointModel.SingleParkingPointResponse,
  id?: string
) => {
  const { query } = useRouter();

  const parkingPoint =
    useSWRRequest<ParkingPointModel.SingleParkingPointResponse>(
      { url: `/parkingpoint/${id || query.id}` },
      { fallbackData }
    );

  return parkingPoint;
};
