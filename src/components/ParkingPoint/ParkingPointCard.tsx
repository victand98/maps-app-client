import { PlaceService, toastErrors, useParkingPoints, useRequest } from "@lib";
import {
  CheckCircle,
  Edit,
  MoreHoriz,
  Place,
  ToggleOff,
  ToggleOn,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
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
  TextField,
  Typography,
} from "@mui/material";
import { ParkingPointModel, PlaceModel } from "@types";
import { formatDistance } from "date-fns";
import React, { FC, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { MdUpdate } from "react-icons/md";
import { toast } from "react-toastify";
import { NumberFormat, PlaceEditForm } from "..";
import { IParkingPoint } from "./ParkingPoint";

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

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<ParkingPointModel.ParkingPointValues>();
  const spots = useWatch({
    control,
    name: "spots",
    defaultValue: parkingPoint.spots,
  });
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

  const toggleStatus = () => {
    doRequest({ status: !parkingPoint.status }, parkingPoint.id);
    handleClose();
  };

  const onSubmit = (data: ParkingPointModel.ParkingPointValues) => {
    doRequest(data, parkingPoint.id);
  };

  useEffect(() => {
    reset({
      occupied: parkingPoint.occupied,
      spots: parkingPoint.spots,
    });
  }, [reset, parkingPoint.occupied, parkingPoint.spots]);

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

        <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            sx={{
              justifyContent: "center",
            }}
          >
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex",
                width: "80%",
              }}
            >
              <NumberFormat<ParkingPointModel.ParkingPointValues>
                control={control}
                customInput={TextField as any}
                decimalScale={0}
                allowNegative={false}
                defaultValue={parkingPoint.occupied}
                min="0"
                isAllowed={(values) => {
                  const { formattedValue, floatValue } = values;
                  return (
                    formattedValue === "" ||
                    (floatValue !== undefined && floatValue <= spots!)
                  );
                }}
                fullWidth
                withHelpers={false}
                name="occupied"
                variant="outlined"
                required
                InputProps={{
                  size: "small",
                }}
                rules={{
                  required: true,
                }}
              />
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ px: 1 }}
                variant="caption"
                textAlign="center"
              >
                ocupados de
              </Typography>

              <NumberFormat<ParkingPointModel.ParkingPointValues>
                control={control}
                customInput={TextField as any}
                decimalScale={0}
                allowNegative={false}
                defaultValue={parkingPoint.spots}
                min="1"
                fullWidth
                withHelpers={false}
                name="spots"
                variant="outlined"
                required
                InputProps={{
                  size: "small",
                }}
                rules={{
                  required: true,
                  min: 1,
                }}
              />

              {isDirty && (
                <IconButton type="submit" color="primary" disabled={loading}>
                  <CheckCircle />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </form>
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
    </Card>
  );
};
