import { NewRouteForm } from "@components";
import { openRouteOverviewState } from "@lib";
import { Route } from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";
import React, { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { CustomControl } from "../Core";
import { ChildElements } from "./ChildElements";

export const RouteControl: FC<ChildElements.RouteControlProps> = (props) => {
  const { currentRoute } = props;
  const [openNewRoute, setOpenNewRoute] = useState(false);
  const [openRouteOverview, setOpenRouteOverview] = useRecoilState(
    openRouteOverviewState
  );

  return (
    <CustomControl position="topright" className="route-control">
      <NewRouteForm
        open={openNewRoute}
        onClose={() => setOpenNewRoute(false)}
      />

      <Tooltip
        title={
          currentRoute ? "Ver mi recorrido actual" : "Iniciar nuevo recorrido"
        }
        placement="left"
      >
        <Badge
          badgeContent={currentRoute ? 1 : 0}
          color="primary"
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <IconButton
            onClick={() => {
              currentRoute ? setOpenRouteOverview(true) : setOpenNewRoute(true);
            }}
            size="large"
            color={currentRoute ? "primary" : "default"}
            style={{
              backgroundColor: "#f5f5f5",
              boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Route fontSize="small" />
          </IconButton>
        </Badge>
      </Tooltip>
    </CustomControl>
  );
};
