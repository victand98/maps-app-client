import {
  getDateFromTime,
  handleFormError,
  PlaceService,
  useRequest,
} from "@lib";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { ParkingPointModel } from "@types";
import { format } from "date-fns";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TimeInput } from "..";
import { IParkingPoint } from "./ParkingPoint";

export const ParkingPointForm: FC<IParkingPoint.ParkingPointFormProps> = (
  props
) => {
  const { currentParkingPoint, onClose, open } = props;

  const { doRequest, loading } =
    useRequest<ParkingPointModel.ParkingPointResponse>({
      request: PlaceService.update,
      onSuccess: (data) => {
        toast.success("Punto de estacionamiento modificado con éxito");
        onClose();
      },
      onError: (err) => {
        handleFormError(err, setError);
      },
    });
  const { control, handleSubmit, setError } =
    useForm<ParkingPointModel.ParkingPointValues>();

  const onSubmit = (data: ParkingPointModel.ParkingPointValues) => {
    data.openingTime = format(data.openingTime as Date, "HH:mm");
    data.closingTime = format(data.closingTime as Date, "HH:mm");
    doRequest(data, currentParkingPoint.id);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      aria-labelledby="edit-place-type-title"
      aria-describedby="edit-place-type-description"
    >
      <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="edit-place-type-title">
          Editar Punto de Estacionamiento
        </DialogTitle>

        <DialogContent dividers={true}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TimeInput<ParkingPointModel.ParkingPointValues>
                fullWidth
                helperText="Especifique la hora de apertura del parqueadero"
                label="Hora de apertura"
                name="openingTime"
                required
                control={control}
                defaultValue={
                  currentParkingPoint.openingTime
                    ? getDateFromTime(currentParkingPoint.openingTime)
                    : new Date()
                }
                rules={{ required: "El campo es requerido" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TimeInput<ParkingPointModel.ParkingPointValues>
                fullWidth
                helperText="Especifique la hora de cierre del parqueadero"
                label="Hora de cierre"
                name="closingTime"
                required
                control={control}
                defaultValue={
                  currentParkingPoint.closingTime
                    ? getDateFromTime(currentParkingPoint.closingTime)
                    : new Date().setHours(new Date().getHours() + 2)
                }
                rules={{ required: "El campo es requerido" }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <LoadingButton
            loading={loading}
            type="submit"
            color="primary"
            variant="contained"
          >
            Guardar
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
