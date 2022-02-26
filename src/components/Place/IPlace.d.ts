import { PlaceModel } from "@types";

declare namespace IPlace {
  export interface PlaceInfoProps {
    place?: PlaceModel.PlaceResponse;
    handleClose: () => void;
  }
}

export { IPlace };
