import {
  handleFormError,
  PlaceTypes,
  PlaceTypeService,
  useRequest,
} from "@lib";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Icon,
  TextField,
} from "@mui/material";
import { IconsModel, PlaceTypeModel } from "@types";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AutocompleteVirtualized, TextInput } from "..";
import { IPlaceType } from "./IPlaceType";

export const PlaceTypeForm: FC<IPlaceType.PlaceTypeFormProps> = (props) => {
  const { iconOptions } = props;
  const router = useRouter();

  const { doRequest } = useRequest<
    PlaceTypeModel.PlaceTypeResponse,
    PlaceTypeModel.PlaceTypeValues
  >({
    request: PlaceTypeService.save,
    onSuccess: (data) => {
      toast.success("Tipo de lugar guardado con éxito");
      const returnUrl =
        (router.query.returnUrl as string) || "/panel/tiposlugar";
      router.push(returnUrl);
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    register,
    setError,
  } = useForm<PlaceTypeModel.PlaceTypeValues>();

  React.useEffect(() => {
    register("icon", {
      required: "El campo es requerido",
    });
  }, [register]);

  const onSubmit = (data: PlaceTypeModel.PlaceTypeValues) => {
    doRequest(data);
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          subheader="Información relacionada a un tipo de lugar"
          title="Tipo de lugar"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput<PlaceTypeModel.PlaceTypeValues>
                fullWidth
                helperText="Especifique el nombre del tipo de lugar"
                defaultValue=""
                label="Nombre"
                name="name"
                placeholder="Parque, Estacionamiento, ..."
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                  minLength: {
                    value: 4,
                    message: "Escriba al menos 4 caracteres",
                  },
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <AutocompleteVirtualized
                onChange={(e, options) => {
                  setValue(
                    "icon",
                    options ? (options as IconsModel.IconsResponse).name : "",
                    { shouldValidate: true }
                  );
                }}
                options={iconOptions}
                getOptionLabel={(option) => option.name}
                groupBy={(option: IconsModel.IconsResponse) =>
                  option.name[0].toUpperCase()
                }
                renderGroup={(params) => params}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > span": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <Icon>{option.name}</Icon>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ícono"
                    required
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                    error={Boolean(errors?.icon)}
                    helperText={errors?.icon?.message}
                  />
                )}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextInput<PlaceTypeModel.PlaceTypeValues>
                type="color"
                fullWidth
                defaultValue="#5bbad5"
                label="Color"
                name="color"
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextInput<PlaceTypeModel.PlaceTypeValues>
                fullWidth
                helperText="Detalles más importantes del lugar"
                defaultValue=""
                label="Descripción"
                name="description"
                placeholder="Escribe lo más relevante"
                multiline
                rows={2}
                variant="outlined"
                control={control}
                rules={{
                  minLength: {
                    value: 4,
                    message: "Escriba al menos 4 caracteres",
                  },
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            color="primary"
            variant="contained"
          >
            Guardar
          </LoadingButton>
        </Box>
      </Card>
    </form>
  );
};

export const PlaceTypeEditForm: FC<IPlaceType.PlaceTypeEditFormProps> = (
  props
) => {
  const { iconOptions, open, onClose, currentPlaceType } = props;

  const { doRequest } = useRequest<
    PlaceTypeModel.PlaceTypeResponse,
    PlaceTypeModel.PlaceTypeValues
  >({
    request: PlaceTypeService.update,
    onSuccess: (data) => {
      toast.success("Tipo de lugar modificado con éxito");
      onClose();
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    register,
    setError,
  } = useForm<PlaceTypeModel.PlaceTypeValues>({
    defaultValues: {
      icon: currentPlaceType.icon,
    },
  });

  React.useEffect(() => {
    register("icon", {
      required: "El campo es requerido",
    });
  }, [register]);

  const onSubmit = (data: PlaceTypeModel.PlaceTypeValues) => {
    doRequest(data, currentPlaceType.id);
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
          Editar Tipo de lugar
        </DialogTitle>

        <DialogContent dividers={true}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput<PlaceTypeModel.PlaceTypeValues>
                fullWidth
                helperText="Especifique el nombre del tipo de lugar"
                defaultValue={currentPlaceType.name}
                InputProps={{
                  readOnly: Object.values(PlaceTypes).includes(
                    currentPlaceType.name as PlaceTypes
                  ),
                }}
                label="Nombre"
                name="name"
                placeholder="Parque, Estacionamiento, ..."
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                  minLength: {
                    value: 4,
                    message: "Escriba al menos 4 caracteres",
                  },
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <AutocompleteVirtualized
                onChange={(e, options) => {
                  setValue(
                    "icon",
                    options ? (options as IconsModel.IconsResponse).name : "",
                    { shouldValidate: true }
                  );
                }}
                options={iconOptions}
                defaultValue={{
                  name: currentPlaceType.icon,
                  code: "",
                }}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                groupBy={(option: IconsModel.IconsResponse) =>
                  option.name[0].toUpperCase()
                }
                renderGroup={(params) => params}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > span": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <Icon>{option.name}</Icon>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ícono"
                    required
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                    error={Boolean(errors?.icon)}
                    helperText={errors?.icon?.message}
                  />
                )}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextInput<PlaceTypeModel.PlaceTypeValues>
                type="color"
                fullWidth
                defaultValue={currentPlaceType.color}
                label="Color"
                name="color"
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextInput<PlaceTypeModel.PlaceTypeValues>
                fullWidth
                helperText="Detalles más importantes del lugar"
                defaultValue={currentPlaceType.description}
                label="Descripción"
                name="description"
                placeholder="Escribe lo más relevante"
                multiline
                rows={2}
                variant="outlined"
                control={control}
                rules={{
                  minLength: {
                    value: 4,
                    message: "Escriba al menos 4 caracteres",
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <LoadingButton
            loading={isSubmitting}
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
