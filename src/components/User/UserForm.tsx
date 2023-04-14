import {
  handleFormError,
  useRequest,
  userPreviewState,
  UserService,
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
  MenuItem,
  Typography,
} from "@mui/material";
import { UserModel } from "@types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilState, useResetRecoilState } from "recoil";
import { TextInput } from "..";
import { IUser } from "./IUser";

export const UserForm: FC<IUser.UserFormProps> = (props) => {
  const { roles } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [userPreview, setUserPreview] = useRecoilState(userPreviewState);
  const resetUserPreviewState = useResetRecoilState(userPreviewState);
  const roleOptions = useMemo(
    () => roles.map((role) => ({ label: role.name, value: role.id })),
    [roles]
  );

  const { doRequest, loading } = useRequest({
    request: UserService.save,
    onSuccess: (data) => {
      toast.success("Usuario guardado con éxito");
      const returnUrl = (router.query.returnUrl as string) || "/panel/usuarios";
      router.push(returnUrl);
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });
  const { control, handleSubmit, setError } = useForm<UserModel.UserValues>();

  const password = useWatch({ control, name: "password", defaultValue: "" });
  const repeatPassword = useWatch({
    control,
    name: "repeatPassword",
    defaultValue: "",
  });

  const onSubmit = (data: UserModel.UserValues) => {
    doRequest(data, session!);
  };

  useEffect(() => {
    return () => {
      resetUserPreviewState();
    };
  }, [resetUserPreviewState]);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          subheader="Información relacionada a un nuevo usuario"
          title="Usuario"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextInput<UserModel.UserValues>
                fullWidth
                helperText="Especifique los nombres del usuario"
                defaultValue=""
                label="Nombres"
                name="firstName"
                placeholder="Jhon Fernando"
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                  minLength: {
                    value: 4,
                    message: "Escriba al menos 4 caracteres",
                  },
                  pattern: {
                    value: /^[a-zA-ZÁ-ź\s\u00F1]*$/,
                    message: "Escriba unicamente letras",
                  },
                  onChange: (e) =>
                    setUserPreview((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    })),
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextInput<UserModel.UserValues>
                fullWidth
                helperText="Especifique los apellidos del usuario"
                defaultValue=""
                label="Apellidos"
                name="lastName"
                placeholder="Gonzales Torres"
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                  minLength: {
                    value: 4,
                    message: "Escriba al menos 4 caracteres",
                  },
                  pattern: {
                    value: /^[a-zA-ZÁ-ź\s\u00F1]*$/,
                    message: "Escriba unicamente letras",
                  },
                  onChange: (e) =>
                    setUserPreview((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    })),
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextInput<UserModel.UserValues>
                type="email"
                fullWidth
                helperText="Especifique el correo electrónico del usuario"
                defaultValue=""
                label="Correo"
                name="email"
                placeholder="usuario@correo.com"
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "El correo proporcionado no es válido",
                  },
                  onChange: (e) =>
                    setUserPreview((prev) => ({
                      ...prev,
                      email: e.target.value,
                    })),
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextInput<UserModel.UserValues>
                fullWidth
                label="Rol"
                name="role"
                required
                defaultValue=""
                select
                control={control}
                rules={{
                  required: "El campo es requerido",
                }}
              >
                {roleOptions.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </TextInput>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextInput<UserModel.UserValues>
                type="password"
                fullWidth
                helperText="Escriba una contraseña segura"
                defaultValue=""
                label="Contraseña"
                name="password"
                placeholder="**********"
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                  minLength: {
                    value: 8,
                    message: "Escriba al menos 8 caracteres",
                  },
                  validate: (v) =>
                    repeatPassword && v !== repeatPassword
                      ? "Las contraseñas no coinciden"
                      : undefined,
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextInput<UserModel.UserValues>
                type="password"
                fullWidth
                helperText="Repita la contraseña ingresada"
                defaultValue=""
                label="Repetir Contraseña"
                name="repeatPassword"
                placeholder="**********"
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                  minLength: {
                    value: 8,
                    message: "Escriba al menos 8 caracteres",
                  },
                  validate: (v) =>
                    v !== password ? "Las contraseñas no coinciden" : undefined,
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
            loading={loading}
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

export const UserEditForm: FC<IUser.UserEditFormProps> = (props) => {
  const { open, onClose, currentUser } = props;
  const { data: session } = useSession();
  const { doRequest, loading } = useRequest({
    request: UserService.update,
    onSuccess: (data) => {
      toast.success("Contraseña modificada con éxito");
      onClose();
    },
    onError: (err) => {
      handleFormError(err as any, setError);
    },
  });

  const { control, handleSubmit, setError } = useForm<UserModel.UserValues>({});

  const password = useWatch({ control, name: "password", defaultValue: "" });
  const repeatPassword = useWatch({
    control,
    name: "repeatPassword",
    defaultValue: "",
  });

  const onSubmit = (data: UserModel.UserValues) => {
    doRequest(data, currentUser.id, session!);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      aria-labelledby="edit-user-type-title"
      aria-describedby="edit-user-type-description"
    >
      <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="edit-user-type-title">
          Nueva Contraseña
          <Typography variant="subtitle2" color="GrayText">
            {currentUser.firstName} {currentUser.lastName}
          </Typography>
        </DialogTitle>

        <DialogContent dividers={true}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput<UserModel.UserValues>
                type="password"
                fullWidth
                helperText="Escriba una contraseña segura"
                defaultValue=""
                label="Contraseña"
                name="password"
                placeholder="**********"
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                  minLength: {
                    value: 8,
                    message: "Escriba al menos 8 caracteres",
                  },
                  validate: (v) =>
                    repeatPassword && v !== repeatPassword
                      ? "Las contraseñas no coinciden"
                      : undefined,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextInput<UserModel.UserValues>
                type="password"
                fullWidth
                helperText="Repita la contraseña ingresada"
                defaultValue=""
                label="Repetir Contraseña"
                name="repeatPassword"
                placeholder="**********"
                required
                variant="outlined"
                control={control}
                rules={{
                  required: "El campo es requerido",
                  minLength: {
                    value: 8,
                    message: "Escriba al menos 8 caracteres",
                  },
                  validate: (v) =>
                    v !== password ? "Las contraseñas no coinciden" : undefined,
                }}
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
