import { Dashboard, Logout, PushPin, Room } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  SvgIcon,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { GiCycling } from "react-icons/gi";
import { MdOpenInNew } from "react-icons/md";
import { Link, NavItem } from "..";
import { ISidebar } from "./Sidebar";

const items: ISidebar.SidebarRoutes = [
  {
    href: "/panel",
    icon: <Dashboard fontSize="small" />,
    title: "Panel",
  },
  {
    href: "/panel/estacionamientos",
    icon: <Room fontSize="small" />,
    title: "Lugares",
  },
  {
    href: "/panel/estacionamientos",
    icon: <Room fontSize="small" />,
    title: "Estacionamientos",
  },
  {
    href: "/panel/tiposlugar",
    icon: <PushPin fontSize="small" />,
    title: "Tipos de Lugar",
  },
];

export const DashboardSidebar: FC<ISidebar.DashboardSidebarProps> = (props) => {
  const { open, onClose } = props;
  const { data } = useSession();
  const router = useRouter();
  const lgUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Link href="/panel" passHref>
              <SvgIcon
                sx={{
                  height: 42,
                  width: 42,
                }}
              >
                <GiCycling />
              </SvgIcon>
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
              onClick={() => router.push("/salir")}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  {data?.user?.firstName} {data?.user?.lastName}
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  {data?.user?.email}
                </Typography>
              </div>
              <SvgIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              >
                <Logout />
              </SvgIcon>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.100" variant="subtitle2">
            Ciclovía App
          </Typography>
          <Typography color="neutral.500" variant="body2">
            Panel de administración del sistema
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%",
              },
            }}
          >
            <Image
              alt="Loja"
              src="/images/Loja.jpg"
              priority
              layout="fixed"
              width={950}
              height={100}
            />
          </Box>
          <Link href="/" passHref withAnchor={false}>
            <Button
              color="secondary"
              component="a"
              endIcon={<MdOpenInNew />}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Ver página principal
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
