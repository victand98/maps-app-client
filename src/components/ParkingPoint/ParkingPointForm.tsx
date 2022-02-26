import {
  parkingPointPreviewState,
  ParkingPointService,
  PlaceTypes,
  useRequest,
} from "@lib";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { ParkingPointModel } from "@types";
import { LatLng } from "leaflet";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaMapMarkedAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { NumberFormat, TextInput } from "..";
import { IParkingPoint } from "./ParkingPoint";
import { useRecoilState } from "recoil";

const MapPicker = dynamic(() => import("@components/Map/MapPicker"), {
  ssr: false,
});

export const ParkingPointForm: FC<IParkingPoint.ParkingPointFormProps> = (
  props
) => {
  const router = useRouter();
  const [parkingPointPreview, setParkingPointPreview] = useRecoilState(
    parkingPointPreviewState
  );
  const [showMap, setShowMap] = React.useState(false);
  const { doRequest } = useRequest<ParkingPointModel.ParkingPointResponse>({
    request: ParkingPointService.save,
    onSuccess: (data) => {
      const returnUrl =
        (router.query.returnUrl as string) || "/panel/estacionamientos";
      router.push(returnUrl);
    },
    onError: (err) => {
      for (const error of err.errors) {
        toast.error(error.message);
      }
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<ParkingPointModel.ParkingPointValues>();

  const spots = useWatch({ control, name: "spots", defaultValue: 1 });

  const handleChooseOnMap = () => setShowMap(!showMap);

  const onChangePosition = (position: LatLng) => {
    setValue("location.coordinates", `${position.lng},${position.lat}`, {
      shouldValidate: true,
    });
    setParkingPointPreview((prev) => ({
      ...prev,
      location: { coordinates: `${position.lng},${position.lat}` },
    }));
  };

  const onSubmit = (data: ParkingPointModel.ParkingPointValues) => {
    const { location, ...rest } = data;
    const coordinates = location.coordinates.split(",").map(Number);

    doRequest({ ...rest, location: { coordinates } });
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          subheader="Información relacionada al punto de estacionamiento"
          title="Punto de estacionamiento"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextInput<ParkingPointModel.ParkingPointValues>
                fullWidth
                helperText="Especifique el nombre del punto"
                defaultValue=""
                label="Nombre"
                name="name"
                placeholder="Punto de estacionamiento N°1"
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
                    setParkingPointPreview((prev) => ({
                      ...prev,
                      name: e.target.value,
                    })),
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextInput<ParkingPointModel.ParkingPointValues>
                fullWidth
                label="Tipo"
                name="type"
                InputProps={{
                  readOnly: true,
                }}
                required
                select
                defaultValue={
                  props.placeTypes.find(
                    (placeType) => placeType.name === PlaceTypes.parking
                  )?.id
                }
                variant="outlined"
                control={control}
              >
                {props.placeTypes.map((placeType) => (
                  <MenuItem key={placeType.id} value={placeType.id}>
                    {placeType.name}
                  </MenuItem>
                ))}
              </TextInput>
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat<ParkingPointModel.ParkingPointValues>
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
                rules={{
                  required: "El campo es requerido",
                  min: {
                    value: 1,
                    message: "El valor mínimo es 1",
                  },
                  onChange: (e) =>
                    setParkingPointPreview((prev) => ({
                      ...prev,
                      spots: parseInt(e.target.value),
                    })),
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat<ParkingPointModel.ParkingPointValues>
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
                    (floatValue !== undefined && floatValue <= spots)
                  );
                }}
                fullWidth
                helperText="Número de espacios ocupados"
                name="occupied"
                label="Ocupados"
                variant="outlined"
                required
                rules={{
                  required: "El campo es requerido",
                  onChange: (e) =>
                    setParkingPointPreview((prev) => ({
                      ...prev,
                      occupied: parseInt(e.target.value),
                    })),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput<ParkingPointModel.ParkingPointValues>
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
                    const coordinatesArray = coordinates.toString().split(",");
                    return (
                      coordinatesArray.length === 2 &&
                      coordinatesArray[0].length >= 1 &&
                      coordinatesArray[1].length >= 1
                    );
                  },
                  onChange: (e) =>
                    setParkingPointPreview((prev) => ({
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
                <Grid item xs={12} sx={{ height: "350px" }}>
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
