import { Box, Button, ListItem } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { Link } from "..";
import { INavbar } from "./Navbar";

export const NavItem: FC<INavbar.NavItemProps> = (props) => {
  const { href, icon, title, ...rest } = props;
  const router = useRouter();
  const active = href ? router.pathname === href : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...rest}
    >
      <Link href={href} passHref withAnchor={false}>
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active ? "rgba(255,255,255, 0.08)" : undefined,
            borderRadius: 1,
            color: active ? "secondary.main" : "neutral.300",
            fontWeight: active ? "fontWeightBold" : undefined,
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </Link>
    </ListItem>
  );
};
