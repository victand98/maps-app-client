import { DirectionsBike, Login, Logout } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { Link } from "..";
import { itemsMapNavbar } from "./items";
import { INavbar } from "./Navbar";

export const MapNavbar: FC<INavbar.MapNavbarProps> = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        role="navigation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Link href="/" passHref>
              <DirectionsBike
                sx={{
                  height: 42,
                  width: 42,
                }}
              />
            </Link>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
              onClick={() =>
                session ? router.push("/salir") : router.push("/ingresar")
              }
            >
              {session?.user ? (
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    {session.user.firstName} {session.user.lastName}
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    {session.user.role.name}
                  </Typography>
                </div>
              ) : (
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    Usuario Anónimo
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    Sin ingresar
                  </Typography>
                </div>
              )}

              {session ? (
                <Logout
                  sx={{
                    color: "neutral.500",
                    width: 14,
                    height: 14,
                  }}
                />
              ) : (
                <Login
                  sx={{
                    color: "neutral.500",
                    width: 14,
                    height: 14,
                  }}
                />
              )}
            </Box>
          </Box>
        </div>

        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />

        <List sx={{ flexGrow: 1 }}>
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
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
    >
      <Link href={item.href} passHref withAnchor={false}>
        <ListItemButton
          key={item.href}
          selected={selected}
          sx={{
            backgroundColor: selected ? "rgba(255,255,255, 0.08)" : undefined,
            borderRadius: 1,
            color: selected ? "secondary.main" : "neutral.300",
            fontWeight: selected ? "fontWeightBold" : undefined,
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: selected ? "secondary.main" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};
