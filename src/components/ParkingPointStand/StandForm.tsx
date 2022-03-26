import {
  getDateFromTime,
  handleFormError,
  ParkingPointStandService,
  ParkingPointStandStatus,
  useRequest,
  useUsers,
} from "@lib";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ParkingPointStandModel, UserModel } from "@types";
import { format } from "date-fns";
import React, { FC, Fragment, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import {
  AutocompleteVirtualized,
  NumberFormat,
  TextInput,
  TimeInput,
} from "..";
import { IParkingPointStand } from "./ParkingPointStand";

export const NewStandForm: FC<IParkingPointStand.NewStandFormProps> = (
  props
) => {
  const { onClose, open, parkingPoint, defaultValue } = props;

  const { control, handleSubmit, setError } =
    useForm<ParkingPointStandModel.ParkingPointStandValues>();
  const { doRequest, loading } =
    useRequest<ParkingPointStandModel.ParkingPointStandResponse>({
      request: ParkingPointStandService.save,
      onSuccess: (data) => {
        toast.success("Puesto agregado con éxito");
        onClose();
      },
      onError: (err) => {
        handleFormError(err, setError);
      },
    });

  const onSubmit = (data: ParkingPointStandModel.ParkingPointStandValues) => {
    data.parkingPoint = parkingPoint.id;
    doRequest(data);
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
          Agregar puesto de parqueo
          <Typography color="GrayText">{parkingPoint.name}</Typography>
        </DialogTitle>

        <DialogContent dividers={true}>
          <DialogContentText gutterBottom>
            Este formulario es para añadir un nuevo puesto o espacio al punto de
            estacionamiento. Recuerde que el número ingresado no debería
            repetirse.
          </DialogContentText>

          <NumberFormat<ParkingPointStandModel.ParkingPointStandValues>
            control={control}
            decimalScale={0}
            allowNegative={false}
            defaultValue={defaultValue}
            min="1"
            fullWidth
            helperText="Número del nuevo puesto"
            name="number"
            label="Número"
            margin="dense"
            required
            rules={{
              required: "El campo es requerido",
              min: {
                value: 1,
                message: "El valor mínimo es 1",
              },
            }}
          />
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

NewStandForm.defaultProps = {
  defaultValue: 1,
};

export const UpdateStandForm: FC<IParkingPointStand.UpdateStandFormProps> = (
  props
) => {
  const { onClose, open, currentParkingPointStand } = props;

  const { control, handleSubmit, setError } =
    useForm<ParkingPointStandModel.ParkingPointStandValues>();
  const { doRequest, loading } =
    useRequest<ParkingPointStandModel.ParkingPointStandResponse>({
      request: ParkingPointStandService.update,
      onSuccess: (data) => {
        toast.success("Puesto modificado con éxito");
        onClose();
      },
      onError: (err) => {
        handleFormError(err, setError);
      },
    });

  const onSubmit = (data: ParkingPointStandModel.ParkingPointStandValues) => {
    doRequest(data, currentParkingPointStand.id);
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
          Modificando puesto de parqueo #{currentParkingPointStand.number}
        </DialogTitle>

        <DialogContent dividers={true}>
          <DialogContentText gutterBottom>
            Este formulario es para modificar un puesto o espacio de un
            estacionamiento. Recuerde que el número ingresado no debería
            repetirse.
          </DialogContentText>

          <NumberFormat<ParkingPointStandModel.ParkingPointStandValues>
            control={control}
            decimalScale={0}
            allowNegative={false}
            defaultValue={currentParkingPointStand.number}
            min="1"
            fullWidth
            helperText="Nuevo número de puesto"
            name="number"
            label="Número"
            margin="dense"
            required
            rules={{
              required: "El campo es requerido",
              min: {
                value: 1,
                message: "El valor mínimo es 1",
              },
            }}
          />
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

export const UpdateStandStatusForm: FC<
  IParkingPointStand.UpdateStandFormProps
> = (props) => {
  const { onClose, open, currentParkingPointStand } = props;

  const { data: users } = useUsers();
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    register,
    clearErrors,
  } = useForm<ParkingPointStandModel.ParkingPointStandValues>({
    defaultValues: {
      user: currentParkingPointStand.currentStandHistory?.user.id,
    },
  });
  const { doRequest, loading } =
    useRequest<ParkingPointStandModel.ParkingPointStandResponse>({
      request: ParkingPointStandService.update,
      onSuccess: (data) => {
        toast.success("Estado modificado con éxito");
        onClose();
      },
      onError: (err) => {
        handleFormError(err, setError);
      },
    });
  const selectedStatus = useWatch({
    control,
    name: "status",
    defaultValue: currentParkingPointStand.status,
  });
  const userOptions = useMemo<UserModel.UserOptions[]>(() => {
    return users
      ? users.map((user) => ({
          label: `${user.firstName} ${user.lastName}`,
          value: user.id,
        }))
      : [];
  }, [users]);

  React.useEffect(() => {
    clearErrors();
    if (selectedStatus === ParkingPointStandStatus.occupied) {
      register("user", {
        required: "El campo es requerido",
      });
    }
  }, [clearErrors, register, selectedStatus]);

  const onSubmit = (data: ParkingPointStandModel.ParkingPointStandValues) => {
    data.entryTime = data.entryTime
      ? format(data.entryTime as Date, "HH:mm")
      : undefined;
    data.exitTime = data.exitTime
      ? format(data.exitTime as Date, "HH:mm")
      : undefined;
    data.currentStandHistory = currentParkingPointStand.currentStandHistory?.id;
    doRequest(data, currentParkingPointStand.id);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      aria-labelledby="edit-parking-point-stand-status-title"
      aria-describedby="edit-parking-point-stand-status-description"
    >
      <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="edit-parking-point-stand-status-title">
          Modificando puesto de parqueo #{currentParkingPointStand.number}
        </DialogTitle>

        <DialogContent
          id="edit-parking-point-stand-status-description"
          dividers={true}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput<ParkingPointStandModel.ParkingPointStandValues>
                fullWidth
                label="Estado"
                name="status"
                required
                select
                defaultValue={currentParkingPointStand.status}
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                }}
              >
                {Object.values(ParkingPointStandStatus).map((status) => (
                  <MenuItem
                    key={status}
                    value={status}
                    disabled={
                      (currentParkingPointStand.status ===
                        ParkingPointStandStatus.occupied &&
                        status === ParkingPointStandStatus.disabled) ||
                      status === currentParkingPointStand.status
                    }
                  >
                    {status}
                  </MenuItem>
                ))}
              </TextInput>
            </Grid>

            {selectedStatus === ParkingPointStandStatus.occupied && (
              <Fragment>
                <Grid item xs={12}>
                  <AutocompleteVirtualized
                    onChange={(e, options) => {
                      setValue(
                        "user",
                        options ? (options as UserModel.UserOptions).value : "",
                        {
                          shouldValidate: true,
                        }
                      );
                    }}
                    options={userOptions}
                    defaultValue={
                      currentParkingPointStand.currentStandHistory
                        ? {
                            label: `${currentParkingPointStand.currentStandHistory.user.firstName} ${currentParkingPointStand.currentStandHistory.user.lastName}`,
                            value:
                              currentParkingPointStand.currentStandHistory.user
                                .id,
                          }
                        : null
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) => option.label}
                    groupBy={(option) => option.label[0].toUpperCase()}
                    renderGroup={(params) => params}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Usuario"
                        required
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password",
                        }}
                        error={Boolean(errors?.user)}
                        helperText={errors?.user?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TimeInput<ParkingPointStandModel.ParkingPointStandValues>
                    fullWidth
                    helperText="Hora de entrada del ciclista"
                    label="Hora de entrada"
                    name="entryTime"
                    required
                    control={control}
                    defaultValue={
                      currentParkingPointStand.currentStandHistory
                        ? getDateFromTime(
                            currentParkingPointStand.currentStandHistory
                              .entryTime
                          )
                        : new Date()
                    }
                    rules={{
                      required: "El campo es requerido",
                      shouldUnregister: true,
                    }}
                  />
                </Grid>
              </Fragment>
            )}

            {selectedStatus === ParkingPointStandStatus.unoccupied &&
              currentParkingPointStand.currentStandHistory && (
                <Fragment>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      defaultValue={`${currentParkingPointStand.currentStandHistory.user.firstName} ${currentParkingPointStand.currentStandHistory.user.lastName}`}
                      InputProps={{
                        readOnly: true,
                      }}
                      label="Usuario"
                      placeholder="Usuario"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TimeInput<ParkingPointStandModel.ParkingPointStandValues>
                      fullWidth
                      helperText="Hora de entrada del ciclista"
                      label="Hora de entrada"
                      name="entryTime"
                      required
                      control={control}
                      timePickerProps={{ readOnly: true }}
                      defaultValue={getDateFromTime(
                        currentParkingPointStand.currentStandHistory.entryTime
                      )}
                      rules={{
                        required: "El campo es requerido",
                        shouldUnregister: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TimeInput<ParkingPointStandModel.ParkingPointStandValues>
                      fullWidth
                      helperText="Hora de salida del ciclista"
                      label="Hora de salida"
                      name="exitTime"
                      required
                      control={control}
                      timePickerProps={{
                        minTime: getDateFromTime(
                          currentParkingPointStand.currentStandHistory.entryTime
                        ),
                      }}
                      defaultValue={new Date()}
                      rules={{
                        required: "El campo es requerido",
                        shouldUnregister: true,
                      }}
                    />
                  </Grid>
                </Fragment>
              )}
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
