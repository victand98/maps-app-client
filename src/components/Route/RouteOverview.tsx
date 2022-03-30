import {
  openRouteOverviewState,
  RouteService,
  toastErrors,
  useCurrentRoute,
  useRequest,
} from "@lib";
import {
  AccessTime,
  DirectionsBike,
  DoneAll,
  Route,
  SportsScore,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { RouteModel } from "@types";
import { format } from "date-fns";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { SwipeableDrawer } from "..";
import { UIRoute } from "./UIRoute";

export const RouteOverview: FC<UIRoute.RouteOverviewProps> = (props) => {
  const { currentRoute } = props;
  const { mutate } = useCurrentRoute();
  const [openOverview, setOpenOverview] = useState(false);
  const [openRouteOverview, setOpenRouteOverview] = useRecoilState(
    openRouteOverviewState
  );

  const { doRequest, loading } = useRequest<
    RouteModel.NewRouteResponse,
    RouteModel.UpdateRouteValues
  >({
    request: RouteService.update,
    onSuccess: (data) => {
      mutate();
      toast.success("¡Ruta completada!");
      localStorage.removeItem("location");
    },
    onError: (err) => {
      toastErrors(err);
    },
  });

  const completeRoute = () => {
    if (localStorage.getItem("location") !== null) {
      const savedLocation = JSON.parse(localStorage.getItem("location")!);
      if (
        (savedLocation as RouteModel.UpdateRouteValues["location"]).coordinates
          .length > 0
      ) {
        const data: RouteModel.UpdateRouteValues = {
          endTime: format(new Date(), "HH:mm"),
          location: savedLocation as RouteModel.UpdateRouteValues["location"],
        };
        doRequest(data, currentRoute!.id);
      } else {
        toast.error("Aun no hay datos suficientes para guardar su recorrido");
      }
    } else {
      toast.error("Aun no hay datos suficientes para guardar su recorrido");
    }
  };

  if (!currentRoute) return null;

  return (
    <SwipeableDrawer
      open={openOverview || openRouteOverview}
      onClose={() => {
        setOpenOverview(false);
        setOpenRouteOverview(false);
      }}
      onOpen={() => {
        setOpenOverview(true);
        setOpenOverview(true);
      }}
      header={
        <Typography sx={{ p: 2, color: "text.secondary" }}>
          Tienes una ruta en progreso
        </Typography>
      }
    >
      <List>
        <ListSubheader>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            type="submit"
            startIcon={<DoneAll />}
            onClick={completeRoute}
          >
            Completar Ruta
          </LoadingButton>
        </ListSubheader>

        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "green" }}>
              <Route />
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={currentRoute.name}
            secondary="Nombre de la ruta"
          />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "Background" }}>
              <SportsScore />
            </Avatar>
          </ListItemAvatar>

          <ListItemText primary={currentRoute.purpose} secondary="Propósito" />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "orange" }}>
              <DirectionsBike />
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={currentRoute.bikeType}
            secondary="Tipo de bicicleta"
          />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "GrayText" }}>
              <AccessTime />
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={currentRoute.startTime}
            secondary="Hora de inicio"
          />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};
