import { MapNavbar } from "@components/Navbar";
import { Menu } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React, { Fragment, useState } from "react";
import { CustomControl } from "../Core";

export const NavbarControl = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <CustomControl position="topright" className="navbar-control">
      <Fragment>
        <MapNavbar open={openDrawer} onClose={() => setOpenDrawer(false)} />

        <Tooltip title="Menú" placement="left">
          <IconButton
            onClick={() => setOpenDrawer(true)}
            size="large"
            style={{
              backgroundColor: "#f5f5f5",
              boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Menu fontSize="small" />
          </IconButton>
        </Tooltip>
      </Fragment>
    </CustomControl>
  );
};
