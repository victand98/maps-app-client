import {
  handleFormError,
  placePreviewState,
  PlaceService,
  PlaceTypes,
  useRequest,
} from "@lib";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  ListItemIcon,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { PlaceModel } from "@types";
import { LatLng } from "leaflet";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { FC, Fragment, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaMapMarkedAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRecoilState, useResetRecoilState } from "recoil";
import { NumberFormat, TextInput } from "..";
import { IPlace } from "./IPlace";

const MapPicker = dynamic(() => import("@components/Map/MapPicker"), {
  ssr: false,
});

export const PlaceForm: FC<IPlace.PlaceFormProps> = (props) => {
  const router = useRouter();
  const [placePreview, setPlacePreview] = useRecoilState(placePreviewState);
  const resetPlacePreviewState = useResetRecoilState(placePreviewState);
  const [showMap, setShowMap] = React.useState(false);
  const { doRequest } = useRequest<PlaceModel.PlaceResponse>({
    request: PlaceService.save,
    onSuccess: (data) => {
      toast.success("Lugar guardado con éxito");
      const returnUrl = (router.query.returnUrl as string) || "/panel/lugares";
      router.push(returnUrl);
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    setError,
  } = useForm<PlaceModel.PlaceValues>();

  const spots = useWatch({ control, name: "spots", defaultValue: 1 });

  const handleChooseOnMap = () => setShowMap(!showMap);

  const onChangePosition = (position: LatLng) => {
    setValue("location.coordinates", `${position.lng},${position.lat}`, {
      shouldValidate: true,
    });
    setPlacePreview((prev) => ({
      ...prev,
      location: { coordinates: `${position.lng},${position.lat}` },
    }));
  };

  const onSubmit = (data: PlaceModel.PlaceValues) => {
    const { location, ...rest } = data;
    const coordinates = location.coordinates.split(",").map(Number);
    doRequest({ ...rest, location: { coordinates } }, placePreview.type?.name);
  };

  useEffect(() => {
    return () => {
      resetPlacePreviewState();
    };
  }, [resetPlacePreviewState]);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          subheader="Información relacionada a un nuevo lugar"
          title="Lugar"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextInput<PlaceModel.PlaceValues>
                fullWidth
                helperText="Especifique el nombre del lugar"
                defaultValue=""
                label="Nombre"
                name="name"
                placeholder="Nuevo lugar N°1"
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                  minLength: {
                    value: 4,
                    message: "Escriba al menos 4 caracteres",
                  },
                  onChange: (e) =>
                    setPlacePreview((prev) => ({
                      ...prev,
                      name: e.target.value,
                    })),
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextInput<PlaceModel.PlaceValues>
                fullWidth
                label="Tipo"
                name="type"
                required
                select
                defaultValue=""
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                }}
              >
                {props.placeTypes.map((placeType) => (
                  <MenuItem
                    key={placeType.id}
                    value={placeType.id}
                    onClick={(e) =>
                      setPlacePreview((prev) => ({
                        ...prev,
                        type: placeType,
                      }))
                    }
                  >
                    <ListItemIcon>
                      <Icon>{placeType.icon}</Icon>
                    </ListItemIcon>
                    <span>{placeType.name}</span>
                  </MenuItem>
                ))}
              </TextInput>
            </Grid>

            {placePreview.type?.name === PlaceTypes.parking && (
              <Fragment>
                <Grid item md={6} xs={12}>
                  <NumberFormat<PlaceModel.PlaceValues>
                    control={control}
                    customInput={TextField as any}
                    decimalScale={0}
                    allowNegative={false}
                    defaultValue="1"
                    min="1"
                    fullWidth
                    helperText="Número de espacios"
                    name="spots"
                    label="Espacios"
                    variant="outlined"
                    required
                    shouldUnregister
                    rules={{
                      required: "El campo es requerido",
                      min: {
                        value: 1,
                        message: "El valor mínimo es 1",
                      },
                      onChange: (e) =>
                        setPlacePreview((prev) => ({
                          ...prev,
                          spots: parseInt(e.target.value),
                        })),
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <NumberFormat<PlaceModel.PlaceValues>
                    control={control}
                    customInput={TextField as any}
                    decimalScale={0}
                    allowNegative={false}
                    defaultValue="0"
                    min="0"
                    isAllowed={(values) => {
                      const { formattedValue, floatValue } = values;
                      return (
                        formattedValue === "" ||
                        (floatValue !== undefined && floatValue <= spots!)
                      );
                    }}
                    fullWidth
                    helperText="Número de espacios ocupados"
                    name="occupied"
                    label="Ocupados"
                    variant="outlined"
                    required
                    shouldUnregister
                    rules={{
                      required: "El campo es requerido",
                      onChange: (e) =>
                        setPlacePreview((prev) => ({
                          ...prev,
                          occupied: parseInt(e.target.value),
                        })),
                    }}
                  />
                </Grid>
              </Fragment>
            )}

            <Grid item xs={12}>
              <TextInput<PlaceModel.PlaceValues>
                fullWidth
                helperText="Dirección detallada del lugar"
                defaultValue=""
                label="Dirección"
                name="formattedAddress"
                placeholder="Av. Principal #100-47 y Calle secundaria"
                multiline
                rows={2}
                variant="outlined"
                control={control}
                rules={{
                  minLength: {
                    value: 4,
                    message: "Escriba al menos 4 caracteres",
                  },
                  onChange: (e) =>
                    setPlacePreview((prev) => ({
                      ...prev,
                      formattedAddress: e.target.value,
                    })),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextInput<PlaceModel.PlaceValues>
                fullWidth
                helperText="Escriba la ubicación en longitud y latitud"
                label="Ubicación"
                name="location.coordinates"
                defaultValue=""
                placeholder="#######,######"
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                  validate: (coordinates) => {
                    const coordinatesArray = coordinates!.toString().split(",");
                    return (
                      coordinatesArray.length === 2 &&
                      coordinatesArray[0].length >= 1 &&
                      coordinatesArray[1].length >= 1
                    );
                  },
                  onChange: (e) =>
                    setPlacePreview((prev) => ({
                      ...prev,
                      location: { coordinates: e.target.value },
                    })),
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Escoger en el mapa">
                        <IconButton onClick={handleChooseOnMap} edge="end">
                          <FaMapMarkedAlt />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />

              <Collapse in={showMap} timeout="auto" unmountOnExit>
                <Grid item xs={12} sx={{ height: "550px" }}>
                  <MapPicker onChangePosition={onChangePosition} />
                </Grid>
              </Collapse>
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

export const PlaceEditForm: FC<IPlace.PlaceEditFormProps> = (props) => {
  const { placeTypes, open, onClose, currentPlace } = props;
  const [showMap, setShowMap] = React.useState(false);
  const { doRequest } = useRequest<PlaceModel.PlaceResponse>({
    request: PlaceService.update,
    onSuccess: (data) => {
      toast.success("Lugar modificado con éxito");
      onClose();
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    setError,
  } = useForm<PlaceModel.PlaceValues>({
    defaultValues: {},
  });

  const spots = useWatch({
    control,
    name: "spots",
    defaultValue: currentPlace.spots,
  });

  const onChangePosition = (position: LatLng) => {
    setValue("location.coordinates", `${position.lng},${position.lat}`, {
      shouldValidate: true,
    });
  };

  const handleChooseOnMap = () => setShowMap(!showMap);

  const onSubmit = (data: PlaceModel.PlaceValues) => {
    const { location, ...rest } = data;
    const coordinates = location.coordinates.split(",").map(Number);
    doRequest({ ...rest, location: { coordinates } }, currentPlace.id);
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
        <DialogTitle id="edit-place-type-title">Editar Lugar</DialogTitle>

        <DialogContent dividers={true}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput<PlaceModel.PlaceValues>
                fullWidth
                helperText="Especifique el nombre del lugar"
                defaultValue={currentPlace.name}
                label="Nombre"
                name="name"
                placeholder="Nuevo lugar N°1"
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

            <Grid item xs={12}>
              <TextInput<PlaceModel.PlaceValues>
                fullWidth
                label="Tipo"
                name="type"
                required
                select
                defaultValue={currentPlace.type.id}
                InputProps={{
                  readOnly: currentPlace.type.name === PlaceTypes.parking,
                }}
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                }}
              >
                {placeTypes.map((placeType) => (
                  <MenuItem
                    key={placeType.id}
                    value={placeType.id}
                    disabled={placeType.name === PlaceTypes.parking}
                  >
                    <ListItemIcon>
                      <Icon>{placeType.icon}</Icon>
                    </ListItemIcon>
                    <span>{placeType.name}</span>
                  </MenuItem>
                ))}
              </TextInput>
            </Grid>

            {currentPlace.occupied !== undefined &&
              currentPlace.spots !== undefined && (
                <Fragment>
                  <Grid item md={6} xs={12}>
                    <NumberFormat<PlaceModel.PlaceValues>
                      control={control}
                      customInput={TextField as any}
                      decimalScale={0}
                      allowNegative={false}
                      defaultValue={currentPlace.spots}
                      min="1"
                      fullWidth
                      helperText="Número de espacios"
                      name="spots"
                      label="Espacios"
                      variant="outlined"
                      required
                      shouldUnregister
                      rules={{
                        required: "El campo es requerido",
                        min: {
                          value: 1,
                          message: "El valor mínimo es 1",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <NumberFormat<PlaceModel.PlaceValues>
                      control={control}
                      customInput={TextField as any}
                      decimalScale={0}
                      allowNegative={false}
                      defaultValue={currentPlace.occupied}
                      min="0"
                      isAllowed={(values) => {
                        const { formattedValue, floatValue } = values;
                        return (
                          formattedValue === "" ||
                          (floatValue !== undefined && floatValue <= spots!)
                        );
                      }}
                      fullWidth
                      helperText="Número de espacios ocupados"
                      name="occupied"
                      label="Ocupados"
                      variant="outlined"
                      required
                      shouldUnregister
                      rules={{
                        required: "El campo es requerido",
                      }}
                    />
                  </Grid>
                </Fragment>
              )}

            <Grid item xs={12}>
              <TextInput<PlaceModel.PlaceValues>
                fullWidth
                helperText="Dirección detallada del lugar"
                defaultValue={currentPlace.formattedAddress}
                label="Dirección"
                name="formattedAddress"
                placeholder="Av. Principal #100-47 y Calle secundaria"
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

            <Grid item xs={12}>
              <TextInput<PlaceModel.PlaceValues>
                fullWidth
                helperText="Escriba la ubicación en longitud y latitud"
                label="Ubicación"
                name="location.coordinates"
                defaultValue={`${currentPlace.location.coordinates[0]},${currentPlace.location.coordinates[1]}`}
                placeholder="#######,######"
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                  validate: (coordinates) => {
                    const coordinatesArray = coordinates!.toString().split(",");
                    return (
                      coordinatesArray.length === 2 &&
                      coordinatesArray[0].length >= 1 &&
                      coordinatesArray[1].length >= 1
                    );
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Escoger en el mapa">
                        <IconButton onClick={handleChooseOnMap} edge="end">
                          <FaMapMarkedAlt />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />

              <Collapse in={showMap} timeout="auto" unmountOnExit>
                <Grid item xs={12} sx={{ height: "550px" }}>
                  <MapPicker onChangePosition={onChangePosition} />
                </Grid>
              </Collapse>
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
