import { getMaxNumber, useParkingPoint } from "@lib";
import { AccessAlarms, Place } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IParkingPointStand } from "./ParkingPointStand";
import { NewStandForm } from "./StandForm";

export const ParkingPointStandListToolbar: FC<
  IParkingPointStand.ParkingPointStandListToolbarProps
> = (props) => {
  const { parkingPoint, parkingPointStands } = props;

  const { mutate } = useParkingPoint();

  const [openNewStandDialog, setOpenNewStandDialog] = useState(false);

  const onCloseNewStandDialog = () => {
    setOpenNewStandDialog(false);
    mutate();
  };

  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Box
          sx={{
            m: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Typography sx={{ display: "inline" }} variant="h4">
              {parkingPoint.name}
            </Typography>

            {parkingPoint.status ? (
              <Chip label="Habilitado" color="success" size="small" />
            ) : (
              <Chip label="Deshabilitado" color="error" size="small" />
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 0.5,
            }}
          >
            <Place color="disabled" fontSize="small" />
            <Typography variant="subtitle2" color="text.secondary">
              {parkingPoint.formattedAddress}
            </Typography>
          </Box>

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
        </Box>

        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setOpenNewStandDialog(true);
            }}
          >
            Añadir Puesto
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <BiSearch />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Buscar puesto de parqueo"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {openNewStandDialog && (
        <NewStandForm
          open={openNewStandDialog}
          onClose={onCloseNewStandDialog}
          parkingPoint={parkingPoint}
          defaultValue={
            getMaxNumber(parkingPointStands.map((item) => item.number)) + 1
          }
        />
      )}
    </Box>
  );
};
