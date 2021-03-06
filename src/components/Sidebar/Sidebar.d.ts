import { Roles } from "@lib";
import { ReactChild } from "react";

declare namespace ISidebar {
  export interface DashboardSidebarProps {
    onClose: () => void;
    open: boolean;
  }

  export type SidebarRoutes = {
    href: string;
    icon: ReactChild;
    title: string;
    roles: Roles[];
  }[];
}

export { ISidebar };
