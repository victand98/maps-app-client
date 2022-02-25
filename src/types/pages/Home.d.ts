import { PlaceModel } from "@types";

declare namespace HomePage {
  export interface HomePageProps {
    places: PlaceModel.PlaceResponse[];
  }
}

export { HomePage };
