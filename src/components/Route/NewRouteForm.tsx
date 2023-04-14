import {
  BikeTypes,
  handleFormError,
  Purposes,
  RouteService,
  useCurrentRoute,
  useRequest,
} from "@lib";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
} from "@mui/material";
import { RouteModel } from "@types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FC, Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, RadioInput, TextInput } from "..";
import { UIRoute } from "./UIRoute";

export const NewRouteForm: FC<UIRoute.NewRouteFormProps> = (props) => {
  const { onClose, open } = props;

  const { data: session } = useSession();
  const { mutate } = useCurrentRoute();

  const { doRequest, loading } = useRequest({
    request: RouteService.save,
    onSuccess: (data) => {
      mutate(data);
      toast.success("¡Su ruta comienza ahora!");
      const location: RouteModel.UpdateRouteValues["location"] = {
        coordinates: [],
      };
      localStorage.setItem("location", JSON.stringify(location));
      onClose();
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });

  const { control, handleSubmit, setError } =
    useForm<RouteModel.NewRouteValues>();

  const onSubmit = (data: RouteModel.NewRouteValues) => {
    const { firstName, id } = session!.user!;
    const currentDate = new Date();
    data.startTime = format(currentDate, "HH:mm");
    data.name = `Maratón de ${firstName} - ${format(currentDate, "Pp")}`;
    data.user = id;
    doRequest(data, session!);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      aria-labelledby="new-route-form-title"
      aria-describedby="new-route-form-description"
    >
      <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="new-route-form-title">
          Iniciar un nuevo recorrido
        </DialogTitle>

        <DialogContent id="new-route-form-description" dividers={true}>
          {!session ? (
            <Fragment>
              <DialogContentText textAlign="center">
                Para iniciar un nuevo recorrido necesitamos saber quien eres,
                por favor inicia sesión o regístrate si todavía no posees una
                cuenta
              </DialogContentText>

              <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="center"
                marginY={2}
              >
                <Link
                  href={`/ingresar?returnUrl=/`}
                  passHref
                  withAnchor={false}
                >
                  <Button variant="contained">Ingresar ahora</Button>
                </Link>
                <Link href={`/registrarse`} passHref withAnchor={false}>
                  <Button variant="outlined">Registrarse</Button>
                </Link>
              </Stack>
            </Fragment>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextInput<RouteModel.NewRouteValues>
                  fullWidth
                  label="Propósito"
                  helperText="Cuéntanos el propósito de tu travesía"
                  name="purpose"
                  required
                  select
                  defaultValue=""
                  control={control}
                  rules={{
                    required: "El campo es requerido",
                  }}
                >
                  {Object.values(Purposes).map((purpose) => (
                    <MenuItem key={purpose} value={purpose}>
                      {purpose}
                    </MenuItem>
                  ))}
                </TextInput>
              </Grid>

              <Grid item xs={12}>
                <RadioInput<RouteModel.NewRouteValues>
                  label="Tipo de bicicleta"
                  helperText="Indícanos el tipo de bicicleta que usarás"
                  name="bikeType"
                  defaultValue=""
                  options={Object.values(BikeTypes).map((bikeType) => ({
                    value: bikeType,
                    label: bikeType,
                  }))}
                  control={control}
                  rules={{
                    required: "El campo es requerido",
                  }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <LoadingButton
            loading={loading}
            type="submit"
            color="primary"
            variant="contained"
            disabled={!session}
          >
            Comenzar
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
