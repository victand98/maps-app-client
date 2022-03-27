import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { Link } from "..";
import { itemsMapNavbar } from "./items";
import { INavbar } from "./Navbar";

export const MapNavbar: FC<INavbar.MapNavbarProps> = (props) => {
  const { open, onClose } = props;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{ width: 250 }}
        role="navigation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <List>
          {itemsMapNavbar.map((item) => (
            <MapNavbarItem key={item.href} item={item} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

const MapNavbarItem: FC<{ item: INavbar.MapNavbarRoutes }> = (props) => {
  const { item } = props;
  const router = useRouter();
  const selected = item.href ? router.pathname === item.href : false;

  return (
    <Link href={item.href} passHref withAnchor={false}>
      <ListItemButton key={item.href} selected={selected}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItemButton>
    </Link>
  );
};
