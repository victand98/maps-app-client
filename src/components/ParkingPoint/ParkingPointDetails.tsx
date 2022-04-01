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
  Skeleton,
  Typography,
} from "@mui/material";
import React, { FC, Fragment } from "react";
import { IParkingPoint } from "./ParkingPoint";

export const ParkingPointDetails: FC<IParkingPoint.ParkingPointDetailsProps> = (
  props
) => {
  const { place, open, onClose } = props;
  const { data } = useParkingPoint(undefined, place.id);

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

      {data ? (
        <DialogContent id="view-parkingpoint-details-description">
          <Typography variant="subtitle2" color="GrayText">
            {data.parkingPoint.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 0.5,
            }}
          >
            <AccessAlarms color="disabled" fontSize="small" />

            {data.parkingPoint.openingTime && data.parkingPoint.closingTime ? (
              <Typography color="green" variant="body2">
                {data.parkingPoint.openingTime} hasta{" "}
                {data.parkingPoint.closingTime}
              </Typography>
            ) : (
              <Typography color="GrayText" variant="body2">
                Horario no definido
              </Typography>
            )}
          </Box>

          <List sx={{ width: "100%" }}>
            {data.parkingPointStands.map((stand) => (
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
      ) : (
        <DialogContent id="view-parkingpoint-details-description">
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" width={210} height={300} />
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};
