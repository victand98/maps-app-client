import { BikewayModel } from "@types";

declare namespace IBikeway {
  export interface BikewayInfoProps {
    bikeway: BikewayModel.BikewayResponse;
    handleClose: () => void;
  }

  export interface IBikewayListResultsProps {
    bikeways?: BikewayModel.BikewayResponse[];
  }

  export interface BikewayEditFormProps {
    currentBikeway: BikewayModel.BikewayResponse;
  }
}

export { IBikeway };
