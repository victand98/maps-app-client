import { RouteModel } from "@types";

declare namespace UIRoute {
  export interface NewRouteFormProps {
    open: boolean;
    onClose: () => void;
  }

  export interface RouteOverviewProps {
    currentRoute?: RouteModel.NewRouteResponse;
  }
}

export { UIRoute };
