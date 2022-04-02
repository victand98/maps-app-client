import { Props, TooltipRenderProps } from "react-joyride";

declare namespace UITour {
  export interface TourProps extends Props {
    onClose: () => void;
  }

  export interface TourTooltipProps extends TooltipRenderProps {}
}

export { UITour };
