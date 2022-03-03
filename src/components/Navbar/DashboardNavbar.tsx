import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  styled,
  SvgIcon,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { FC } from "react";
import { AiFillBell, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
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
            <SvgIcon fontSize="small">
              <AiOutlineMenu />
            </SvgIcon>
          </IconButton>
          <Tooltip title="Buscar">
            <IconButton sx={{ ml: 1 }}>
              <SvgIcon fontSize="small">
                <AiOutlineSearch />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contactos">
            <IconButton sx={{ ml: 1 }}>
              <SvgIcon fontSize="small">
                <FiUsers />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Notificaciones">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <SvgIcon fontSize="small">
                  <AiFillBell />
                </SvgIcon>
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
