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
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { Link, NavItem } from "..";
import { ISidebar } from "./Sidebar";
import { GiCycling } from "react-icons/gi";
import { HiOutlineSelector } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { MdOpenInNew } from "react-icons/md";
import { FaParking } from "react-icons/fa";

const items: ISidebar.SidebarRoutes = [
  {
    href: "/panel",
    icon: <AiFillHome fontSize="small" />,
    title: "Panel",
  },
  {
    href: "/panel/estacionamientos",
    icon: <FaParking fontSize="small" />,
    title: "Estacionamientos",
  },
];

export const DashboardSidebar: FC<ISidebar.DashboardSidebarProps> = (props) => {
  const { open, onClose } = props;
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
            <Link href="/" passHref>
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
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Acme Inc
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  Your tier : Premium
                </Typography>
              </div>
              <SvgIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              >
                <HiOutlineSelector />
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
            Need more features?
          </Typography>
          <Typography color="neutral.500" variant="body2">
            Check out our Pro solution template.
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
            {/* TODO: Change image */}
            <img alt="Go to pro" src="https://picsum.photos/350/150" />
          </Box>
          <Link
            href="https://material-kit-pro-react.devias.io/"
            passHref
            withAnchor={false}
          >
            <Button
              color="secondary"
              component="a"
              endIcon={<MdOpenInNew />}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Pro Live Preview
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
