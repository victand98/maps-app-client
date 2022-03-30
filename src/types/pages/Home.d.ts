import { PlaceModel } from "@types";
import { BikewayModel } from "@types/Bikeway";
import { RouteModel } from "@types/Route";

declare namespace HomePage {
  export interface HomePageProps {
    places: PlaceModel.PlaceResponse[];
    bikeways: BikewayModel.BikewayResponse[];
    currentRoute?: RouteModel.NewRouteResponse;
  }
}

export { HomePage };
