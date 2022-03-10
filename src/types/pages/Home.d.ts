import { PlaceModel } from "@types";
import { BikewayModel } from "@types/Bikeway";

declare namespace HomePage {
  export interface HomePageProps {
    places: PlaceModel.PlaceResponse[];
    bikeways: BikewayModel.BikewayResponse[];
  }
}

export { HomePage };
