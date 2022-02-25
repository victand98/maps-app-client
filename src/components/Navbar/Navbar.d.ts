declare namespace INavbar {
  export interface DashboardNavbarProps {
    onSidebarOpen: () => void;
  }

  export interface NavItemProps {
    href: string;
    icon: ReactChild;
    title: string;
  }
}

export { INavbar };
