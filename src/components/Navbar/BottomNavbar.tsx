import { Dashboard, Home, Person } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  PaperProps,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { FC, Fragment, useEffect } from "react";
import { INavbar } from "./Navbar";

const items: INavbar.BottomNavbarRoutes = [
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
];

export const BottomNavbar: FC<PaperProps> = (props) => {
  const { sx, ...rest } = props;
  const router = useRouter();
  const [value, setValue] = React.useState<number>(-1);
  const lgDown = useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg"), {
    defaultMatches: true,
  });

  const navigateTo = (href: string) => {
    router.replace(href);
  };

  useEffect(() => {
    const selected = items.findIndex((item) => item.href === router.pathname);
    setValue(selected);
  }, [router.pathname]);

  if (!lgDown) return <div></div>;

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        ...sx,
      }}
      elevation={3}
      {...rest}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {items.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            onClick={() => navigateTo(item.href)}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
