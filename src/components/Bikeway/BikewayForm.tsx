import {
  BikewayCoordinatesState,
  BikewayService,
  handleFormError,
  useRequest,
} from "@lib";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { BikewayModel } from "@types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilState, useResetRecoilState } from "recoil";
import { NumberFormat, TextInput } from "..";
import { IBikeway } from "./IBikeway";

export const BikewayForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [bikewayCoordinates] = useRecoilState(BikewayCoordinatesState);
  const resetBikewayCoordinatesState = useResetRecoilState(
    BikewayCoordinatesState
  );
  const { doRequest, loading } = useRequest({
    request: BikewayService.save,
    onSuccess: (data) => {
      toast.success("Ruta guardado con éxito");
      const returnUrl =
        (router.query.returnUrl as string) || "/panel/ciclovias";
      router.push(returnUrl);
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });

  const { control, handleSubmit, setError } =
    useForm<BikewayModel.BikewayValues>();

  const onSubmit = (data: BikewayModel.BikewayValues) => {
    if (!bikewayCoordinates.geometry) {
      toast.warn("Es necesario que dibuje la ruta en el mapa");
      return;
    }
    doRequest({ ...data, location: bikewayCoordinates.geometry }, session!);
  };

  useEffect(() => {
    return () => {
      resetBikewayCoordinatesState();
    };
  }, [resetBikewayCoordinatesState]);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          subheader="Información relacionada a una nueva ciclovía"
          title="Ciclovía"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput<BikewayModel.BikewayValues>
                fullWidth
                helperText="Especifique el nombre de la ciclovía"
                defaultValue=""
                label="Nombre"
                name="name"
                placeholder="Ciclovía N°1"
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
              <TextInput<BikewayModel.BikewayValues>
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
              <NumberFormat<BikewayModel.BikewayValues>
                control={control}
                customInput={TextField as any}
                allowNegative={false}
                decimalScale={2}
                defaultValue="1"
                min="1"
                fullWidth
                helperText="Ancho de la linea"
                name="width"
                label="Ancho"
                variant="outlined"
                required
                rules={{
                  required: "El campo es requerido",
                  min: {
                    value: 1,
                    message: "El valor mínimo es 1",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextInput<BikewayModel.BikewayValues>
                fullWidth
                helperText="Escriba una descripción detallada de la ciclovía"
                defaultValue=""
                label="Descripción"
                name="description"
                placeholder="Desde a Av. Principal hasta la Av. Nro 1"
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
              <Typography id="opacity-slider" color="GrayText" gutterBottom>
                Opacidad
              </Typography>
              <Controller
                control={control}
                name="opacity"
                defaultValue="1"
                render={({ field: { value, onChange } }) => (
                  <Slider
                    aria-label="Opacidad"
                    valueLabelDisplay="auto"
                    aria-labelledby="opacity-slider"
                    step={0.1}
                    min={0}
                    max={1}
                    value={value ? parseFloat(value) : 0}
                    marks
                    onChange={(e, value) => onChange(value)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <Box sx={{ p: 2 }}>
          <LoadingButton
            loading={loading}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Guardar
          </LoadingButton>
        </Box>
      </Card>
    </form>
  );
};

export const BikewayEditForm: FC<IBikeway.BikewayEditFormProps> = (props) => {
  const { currentBikeway } = props;
  const router = useRouter();
  const { data: session } = useSession();
  const [bikewayCoordinates] = useRecoilState(BikewayCoordinatesState);
  const resetBikewayCoordinatesState = useResetRecoilState(
    BikewayCoordinatesState
  );
  const { doRequest, loading } = useRequest({
    request: BikewayService.update,
    onSuccess: (data) => {
      toast.success("Ruta modificada con éxito");
      const returnUrl =
        (router.query.returnUrl as string) || "/panel/ciclovias";
      router.push(returnUrl);
    },
    onError: (err) => {
      handleFormError(err as any, setError);
    },
  });

  const { control, handleSubmit, setError } =
    useForm<BikewayModel.BikewayValues>();

  const onSubmit = (data: BikewayModel.BikewayValues) => {
    if (!bikewayCoordinates.geometry) {
      toast.warn("Es necesario que dibuje la ruta en el mapa");
      return;
    }
    doRequest(
      { ...data, location: bikewayCoordinates.geometry },
      currentBikeway.id,
      session!
    );
  };

  useEffect(() => {
    return () => {
      resetBikewayCoordinatesState();
    };
  }, [resetBikewayCoordinatesState]);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          subheader="Información relacionada a ciclovía existente"
          title="Ciclovía"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput<BikewayModel.BikewayValues>
                fullWidth
                helperText="Especifique el nombre de la ciclovía"
                defaultValue={currentBikeway.name}
                label="Nombre"
                name="name"
                placeholder="Ciclovía N°1"
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
              <TextInput<BikewayModel.BikewayValues>
                type="color"
                fullWidth
                defaultValue={currentBikeway.color}
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
              <NumberFormat<BikewayModel.BikewayValues>
                control={control}
                customInput={TextField as any}
                allowNegative={false}
                decimalScale={2}
                defaultValue={currentBikeway.width}
                min="1"
                fullWidth
                helperText="Ancho de la linea"
                name="width"
                label="Ancho"
                variant="outlined"
                required
                rules={{
                  required: "El campo es requerido",
                  min: {
                    value: 1,
                    message: "El valor mínimo es 1",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextInput<BikewayModel.BikewayValues>
                fullWidth
                helperText="Escriba una descripción detallada de la ciclovía"
                defaultValue={currentBikeway.description}
                label="Descripción"
                name="description"
                placeholder="Desde a Av. Principal hasta la Av. Nro 1"
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
              <Typography id="opacity-slider" color="GrayText" gutterBottom>
                Opacidad
              </Typography>
              <Controller
                control={control}
                name="opacity"
                defaultValue={currentBikeway.opacity.toString()}
                render={({ field: { value, onChange } }) => (
                  <Slider
                    aria-label="Opacidad"
                    valueLabelDisplay="auto"
                    aria-labelledby="opacity-slider"
                    step={0.1}
                    min={0}
                    max={1}
                    value={value ? parseFloat(value) : 0}
                    marks
                    onChange={(e, value) => onChange(value)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <Box sx={{ p: 2 }}>
          <LoadingButton
            loading={loading}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Editar
          </LoadingButton>
        </Box>
      </Card>
    </form>
  );
};
