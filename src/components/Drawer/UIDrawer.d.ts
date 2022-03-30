import { SwipeableDrawerProps as MUISwipeableDrawerProps } from "@mui/material";
import { ReactNode } from "react";

declare namespace UIDrawer {
  export interface SwipeableDrawerProps extends MUISwipeableDrawerProps {
    header: ReactNode;
  }
}

export { UIDrawer };
