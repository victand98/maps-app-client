import { Home, Dashboard, Person, Route } from "@mui/icons-material";
import { INavbar } from "./Navbar";

export const itemsMapNavbar: INavbar.MapNavbarRoutes[] = [
  {
    href: "/",
    icon: <Home />,
    label: "Principal",
  },
  {
    href: "/panel",
    icon: <Dashboard />,
    label: "Panel",
  },
  {
    href: "/panel/perfil",
    icon: <Person />,
    label: "Perfil",
  },
  {
    href: "/panel/rutas/recorridas",
    icon: <Route />,
    label: "Mis rutas",
  },
];
