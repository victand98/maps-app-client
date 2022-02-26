import { ParkingPointModel } from "@types";
import { atom } from "recoil";

export const parkingPointPreviewState =
  atom<ParkingPointModel.ParkingPointValues>({
    key: "parkingPointPreviewState",
    default: {
      type: "",
      location: {
        coordinates: "",
      },
      name: "",
      occupied: 0,
      spots: 1,
    },
  });
