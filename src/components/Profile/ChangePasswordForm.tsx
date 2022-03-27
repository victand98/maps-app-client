import { AuthService, handleFormError, useRequest } from "@lib";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";
import { UserModel } from "@types";
import React, { FC } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { TextInput } from "..";
import { IProfile } from "./IProfile";

export const ChangePasswordForm: FC<IProfile.ChangePasswordFormProps> = (
  props
) => {
  const { doRequest, loading } = useRequest<IProfile.ChangePasswordValues>({
    request: AuthService.updatePassword,
    onSuccess: (data) => {
      toast.success("Contraseña modificado con éxito");
      reset();
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });
  const { control, handleSubmit, setError, reset } =
    useForm<IProfile.ChangePasswordValues>();
  const newPassword = useWatch({
    control,
    name: "newPassword",
    defaultValue: "",
  });
  const repeatNewPassword = useWatch({
    control,
    name: "repeatNewPassword",
    defaultValue: "",
  });
  const onSubmit = (data: IProfile.ChangePasswordValues) => {
    doRequest(data);
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          title="Cambiar contraseña"
          subheader="Crear nueva contraseña para su cuenta"
        />

        <Divider />

        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput<IProfile.ChangePasswordValues>
                type="password"
                fullWidth
                helperText="Escriba su actual contraseña"
                defaultValue=""
                label="Contraseña Actual"
                name="password"
                placeholder="**********"
                required
                control={control}
                rules={{
                  required: "El campo es requerido",
                  minLength: {
                    value: 8,
                    message: "Escriba al menos 8 caracteres",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextInput<IProfile.ChangePasswordValues>
                type="password"
                fullWidth
                helperText="Escriba su nueva contraseña"
                defaultValue=""
                label="Nueva Contraseña"
                name="newPassword"
                placeholder="**********"
                required
                control={control}
                rules={{
                  required: "El campo es requerido",
                  minLength: {
                    value: 8,
                    message: "Escriba al menos 8 caracteres",
                  },
                  validate: (v) =>
                    repeatNewPassword && v !== repeatNewPassword
                      ? "Las contraseñas no coinciden"
                      : undefined,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextInput<IProfile.ChangePasswordValues>
                type="password"
                fullWidth
                helperText="Repita su nueva contraseña"
                defaultValue=""
                label="Repetir Nueva Contraseña"
                name="repeatNewPassword"
                placeholder="**********"
                required
                control={control}
                rules={{
                  required: "El campo es requerido",
                  minLength: {
                    value: 8,
                    message: "Escriba al menos 8 caracteres",
                  },
                  validate: (v) =>
                    v !== newPassword
                      ? "Las contraseñas no coinciden"
                      : undefined,
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
            Cambiar Contraseña
          </LoadingButton>
        </Box>
      </Card>
    </form>
  );
};
