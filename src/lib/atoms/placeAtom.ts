import { PlaceModel, PlaceTypeModel } from "@types";
import { atom } from "recoil";

interface PlacePreviewStateAtom {
  type?: PlaceTypeModel.PlaceTypeResponse;
  location: PlaceModel.PlaceValues["location"];
  name: PlaceModel.PlaceValues["name"];
  occupied?: PlaceModel.PlaceValues["occupied"];
  spots?: PlaceModel.PlaceValues["spots"];
  formattedAddress?: PlaceModel.PlaceValues["formattedAddress"];
}

export const placePreviewState = atom<PlacePreviewStateAtom>({
  key: "placePreviewState",
  default: {
    location: {
      coordinates: "",
    },
    name: "",
    occupied: 0,
    spots: 1,
  },
});
