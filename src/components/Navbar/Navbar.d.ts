import { BottomNavigationProps, PaperProps } from "@mui/material";
import { ReactChild } from "react";

declare namespace INavbar {
  export interface DashboardNavbarProps {
    onSidebarOpen: () => void;
  }

  export interface NavItemProps {
    href: string;
    icon: ReactChild;
    title: string;
  }

  export type BottomNavbarRoutes = {
    href: string;
    icon: ReactChild;
    label: string;
  }[];

  /**
   * Map Navbar
   */
  export interface MapNavbarProps {
    open: boolean;
    onClose: () => void;
  }

  export type MapNavbarRoutes = {
    href: string;
    icon: ReactChild;
    label: string;
  };
}

export { INavbar };
