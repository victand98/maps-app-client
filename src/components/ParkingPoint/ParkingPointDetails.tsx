import { getStandChipColor, useParkingPoint } from "@lib";
import { AccessAlarms, DirectionsBike } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { FC, Fragment } from "react";
import { IParkingPoint } from "./ParkingPoint";

export const ParkingPointDetails: FC<IParkingPoint.ParkingPointDetailsProps> = (
  props
) => {
  const { place, open, onClose } = props;
  const { data } = useParkingPoint(undefined, place.id);

  if (!data) return null;
  const { parkingPoint, parkingPointStands } = data;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      aria-labelledby="view-parkingpoint-details-title"
      aria-describedby="view-parkingpoint-details-description"
    >
      <DialogTitle id="view-parkingpoint-details-title">
        Puestos de Parqueo
      </DialogTitle>

      <DialogContent id="view-parkingpoint-details-description">
        <Typography variant="subtitle2" color="GrayText">
          {parkingPoint.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 0.5,
          }}
        >
          <AccessAlarms color="disabled" fontSize="small" />

          {parkingPoint.openingTime && parkingPoint.closingTime ? (
            <Typography color="green" variant="body2">
              {parkingPoint.openingTime} hasta {parkingPoint.closingTime}
            </Typography>
          ) : (
            <Typography color="GrayText" variant="body2">
              Horario no definido
            </Typography>
          )}
        </Box>

        <List sx={{ width: "100%" }}>
          {parkingPointStands.map((stand) => (
            <Fragment key={stand.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: "purple",
                    }}
                  >
                    <DirectionsBike />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={`Puesto de parqueo #${stand.number}`}
                  secondary={
                    <Chip
                      component="span"
                      label={stand.status}
                      color={getStandChipColor(stand.status)}
                      size="small"
                    />
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};
