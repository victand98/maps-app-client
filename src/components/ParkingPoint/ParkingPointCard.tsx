import { PlaceService, toastErrors, useParkingPoints, useRequest } from "@lib";
import {
  DateRange,
  Edit,
  MoreHoriz,
  Place,
  ToggleOff,
  ToggleOn,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
} from "@mui/material";
import { PlaceModel } from "@types";
import { formatDistance } from "date-fns";
import React, { FC, useState } from "react";
import { MdUpdate } from "react-icons/md";
import { toast } from "react-toastify";
import { Link, PlaceEditForm } from "..";
import { IParkingPoint } from "./ParkingPoint";
import { ParkingPointForm } from "./ParkingPointForm";

export const ParkingPointCard: FC<IParkingPoint.ParkingPointCardProps> = (
  props
) => {
  const { parkingPoint, placeTypes } = props;
  const { mutate } = useParkingPoints();

  const { doRequest, loading } = useRequest<PlaceModel.PlaceResponse>({
    request: PlaceService.update,
    onSuccess: (data) => {
      toast.success("Punto de estacionamiento actualizado");
      mutate();
    },
    onError: (error) => {
      toastErrors(error);
    },
  });

  const [openEditTimeForm, setOpenEditTimeForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditFormClose = () => {
    setOpenEditForm(false);
    mutate();
  };

  const handleEditTimeFormClose = () => {
    setOpenEditTimeForm(false);
    mutate();
  };

  const toggleStatus = () => {
    doRequest({ status: !parkingPoint.status }, parkingPoint.id);
    handleClose();
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: "12px",
          top: "10px",
        }}
      >
        <IconButton
          id={`more-button-${parkingPoint.id}`}
          aria-label="propiedades"
          aria-controls={
            open ? `parkingpoint-menu-${parkingPoint.id}` : undefined
          }
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHoriz />
        </IconButton>

        <Menu
          id={`parkingpoint-menu-${parkingPoint.id}`}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": `more-button-${parkingPoint.id}`,
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            onClick={() => {
              setOpenEditForm(true);
              handleClose();
            }}
          >
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => {
              setOpenEditTimeForm(true);
              handleClose();
            }}
          >
            <ListItemIcon>
              <DateRange fontSize="small" />
            </ListItemIcon>
            <ListItemText>Establecer Horario</ListItemText>
          </MenuItem>

          <MenuItem onClick={toggleStatus}>
            <ListItemIcon>
              {parkingPoint.status ? (
                <ToggleOff fontSize="small" />
              ) : (
                <ToggleOn fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>
              {parkingPoint.status ? "Deshabilitar" : "Habilitar"}
            </ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar
            alt={parkingPoint.name}
            variant="square"
            sx={{ bgcolor: parkingPoint.type.color }}
          >
            <Icon>{parkingPoint.type.icon}</Icon>
          </Avatar>
        </Box>

        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h6"
          noWrap
        >
          {parkingPoint.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Place color="disabled" fontSize="small" />
          <Typography
            variant="subtitle2"
            color="text.secondary"
            textAlign="center"
            gutterBottom
          >
            {parkingPoint.formattedAddress}
          </Typography>
        </Box>

        {parkingPoint.openingTime && parkingPoint.closingTime ? (
          <Typography color="green" variant="body2" align="center">
            {parkingPoint.openingTime} hasta {parkingPoint.closingTime}
          </Typography>
        ) : (
          <Typography color="GrayText" variant="body2" align="center">
            Horario no definido
          </Typography>
        )}

        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            href={`/panel/estacionamientos/${parkingPoint.id}`}
            passHref
            withAnchor={false}
          >
            <Button variant="outlined" color="primary">
              Ver detalles
            </Button>
          </Link>
        </Box>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <SvgIcon color="action">
              <MdUpdate />
            </SvgIcon>
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {formatDistance(new Date(parkingPoint.updatedAt), new Date(), {
                addSuffix: true,
              })}
            </Typography>
          </Grid>

          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <SvgIcon color="action">
              {parkingPoint.status ? (
                <ToggleOn fontSize="small" />
              ) : (
                <ToggleOff fontSize="small" />
              )}
            </SvgIcon>
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {parkingPoint.status ? "Habilitado" : "Deshabilitado"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <PlaceEditForm
        placeTypes={placeTypes}
        currentPlace={parkingPoint}
        open={openEditForm}
        onClose={handleEditFormClose}
      />

      <ParkingPointForm
        currentParkingPoint={parkingPoint}
        open={openEditTimeForm}
        onClose={handleEditTimeFormClose}
      />
    </Card>
  );
};
