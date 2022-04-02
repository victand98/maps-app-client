import { ContainerProps } from "@mui/material";
import { ReactNode } from "react";

declare namespace Layout {
  export interface DashboardLayoutProps {
    breadcrumbs?: boolean;
    containerProps?: ContainerProps;
  }
}

export { Layout };

export interface LayoutProps {
  children: ReactNode;
}
