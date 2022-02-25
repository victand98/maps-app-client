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
import React, { FC } from "react";
import { AiFillBell, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { INavbar } from "./Navbar";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar: FC<INavbar.DashboardNavbarProps> = (props) => {
  const { onSidebarOpen, ...rest } = props;

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
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SvgIcon fontSize="small">
                <AiOutlineSearch />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <SvgIcon fontSize="small">
                <FiUsers />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
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
            }}
            src="https://picsum.photos/100/100"
          >
            <SvgIcon fontSize="medium">
              <FaUserCircle />
            </SvgIcon>
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};
