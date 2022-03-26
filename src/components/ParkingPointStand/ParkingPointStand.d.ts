import { ParkingPointModel } from "@types";

declare namespace IParkingPointStand {
  export interface ParkingPointStandListResultsProps {
    parkingPointStands: ParkingPointModel.ParkingPointStand[];
  }

  export interface ParkingPointStandListToolbarProps {
    parkingPoint: ParkingPointModel.ParkingPointResponse;
    parkingPointStands: ParkingPointModel.ParkingPointStand[];
  }

  export interface StandHistoryDialogProps {
    currentStandHistory: ParkingPointModel.CurrentStandHistory;
    open: boolean;
    onClose: () => void;
  }

  export interface NewStandFormProps {
    parkingPoint: ParkingPointModel.ParkingPointResponse;
    open: boolean;
    onClose: () => void;
    defaultValue?: number | string;
  }

  export interface UpdateStandFormProps {
    currentParkingPointStand: ParkingPointModel.ParkingPointStand;
    open: boolean;
    onClose: () => void;
  }
}

export { IParkingPointStand };
