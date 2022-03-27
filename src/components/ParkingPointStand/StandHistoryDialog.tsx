import { getInitials } from "@lib";
import { AccessAlarm, AccessTimeFilled } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { FC, Fragment } from "react";
import { IParkingPointStand } from "./ParkingPointStand";

export const StandHistoryDialog: FC<
  IParkingPointStand.StandHistoryDialogProps
> = (props) => {
  const { currentStandHistory, onClose, open } = props;
  const { entryTime, user } = currentStandHistory;

  const router = useRouter();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      aria-labelledby="view-current-stand-history-title"
      aria-describedby="view-current-stand-history-description"
    >
      <DialogTitle id="view-current-stand-history-title">
        Ocupado por
      </DialogTitle>

      <DialogContent id="view-current-stand-history-description">
        <List sx={{ width: "100%" }}>
          <ListItemButton
            onClick={() => {
              router.push(`/panel/perfil/${user.id}`);
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "purple",
                }}
              >
                {getInitials(`${user.firstName} ${user.lastName}`)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Fragment>
                  <Typography sx={{ display: "inline", mr: 0.5 }}>
                    {user.firstName} {user.lastName}
                  </Typography>

                  {user.status ? (
                    <Chip label="Activo" color="success" size="small" />
                  ) : (
                    <Chip label="Inactivo" color="error" size="small" />
                  )}
                </Fragment>
              }
              secondary={user.email}
            />
          </ListItemButton>

          <ListItem>
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "green",
                }}
              >
                <AccessAlarm />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={entryTime} secondary="Hora de ingreso" />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "orange",
                }}
              >
                <AccessTimeFilled />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Por definir" secondary="Hora de salida" />
          </ListItem>
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};
