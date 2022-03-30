import { RouteModel } from "@types";

declare namespace UIRoute {
  /**
   * Common
   */
  export interface NewRouteFormProps {
    open: boolean;
    onClose: () => void;
  }

  export interface RouteOverviewProps {
    currentRoute?: RouteModel.NewRouteResponse;
  }

  export interface RouteDetailsProps {
    route: RouteModel.SingleRouteResponse;
  }

  export interface RouteMapViewerProps {
    route: RouteModel.SingleRouteResponse;
  }

  /**
   * My Routes
   */
  export interface MyRoutesListToolbarProps {}

  export interface MyRoutesListResultsProps {
    myRoutes: RouteModel.RouteResponse[];
  }

  /**
   * Routes
   */
  export interface RoutesListToolbarProps {}

  export interface RoutesListResultsProps {
    routes: RouteModel.RouteResponse[];
  }
}

export { UIRoute };
