import { deepPurple } from "@mui/material/colors";
import React, { FC } from "react";
import ReactJoyride, { CallBackProps, STATUS } from "react-joyride";
import { TourTooltip } from "./TourTooltip";
import { UITour } from "./UITour";

export const Tour: FC<UITour.TourProps> = (props) => {
  const { onClose } = props;

  const handleCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      onClose();
    }
  };

  return (
    <ReactJoyride
      callback={handleCallback}
      tooltipComponent={TourTooltip}
      styles={{
        beaconInner: {
          backgroundColor: deepPurple[800],
        },
        beaconOuter: {
          backgroundColor: deepPurple[200],
          border: `2px solid ${deepPurple[600]}`,
        },
      }}
      {...props}
    />
  );
};

Tour.defaultProps = {
  locale: {
    back: "Regresar",
    close: "Cerrar",
    last: "Finalizar",
    next: "Siguiente",
    open: "Abrir",
    skip: "Saltar",
  },
  continuous: true,
  scrollToFirstStep: true,
  showSkipButton: true,
  showProgress: true,
};
