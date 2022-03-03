import { Group, Menu, Notifications, Search } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  styled,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { FC } from "react";
import { INavbar } from "./Navbar";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar: FC<INavbar.DashboardNavbarProps> = (props) => {
  const { onSidebarOpen, ...rest } = props;
  const { data } = useSession();

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...rest}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <Menu fontSize="small" />
          </IconButton>
          <Tooltip title="Buscar">
            <IconButton sx={{ ml: 1 }}>
              <Search fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contactos">
            <IconButton sx={{ ml: 1 }}>
              <Group fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notificaciones">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <Notifications fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
              bgcolor: "purple",
            }}
          >
            {data?.user?.firstName[0]}
            {data?.user?.lastName[0]}
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};
