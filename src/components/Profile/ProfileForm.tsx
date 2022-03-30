import {
  CyclistTypes,
  Genders,
  handleFormError,
  useRequest,
  UserService,
  useUser,
} from "@lib";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
} from "@mui/material";
import { UserModel } from "@types";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TextInput } from "..";
import { IProfile } from "./IProfile";

export const ProfileForm: FC<IProfile.ProfileFormProps> = (props) => {
  const { profile } = props;

  const { mutate } = useUser({ id: profile.id });

  const { doRequest, loading } = useRequest<UserModel.UserResponse>({
    request: UserService.update,
    onSuccess: (data) => {
      toast.success("Perfil modificado con éxito");
      mutate();
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });
  const { control, handleSubmit, setError } = useForm<UserModel.UserValues>();

  const onSubmit = (data: UserModel.UserValues) => {
    doRequest(data, profile.id);
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          title="Mi perfil"
          subheader={`${profile.firstName} ${profile.lastName}`}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextInput<UserModel.UserValues>
                fullWidth
                helperText="Mis nombres"
                defaultValue={profile.firstName}
                label="Nombres"
                name="firstName"
                placeholder="Jhon Fernando"
                required
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
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextInput<UserModel.UserValues>
                fullWidth
                helperText="Mis apellidos"
                defaultValue={profile.lastName}
                label="Apellidos"
                name="lastName"
                placeholder="Gonzales Torres"
                required
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
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextInput<UserModel.UserValues>
                type="email"
                fullWidth
                helperText="Mi dirección de correo electrónico"
                defaultValue={profile.email}
                label="Correo"
                name="email"
                placeholder="usuario@correo.com"
                required
                control={control}
                rules={{
                  required: "El campo es requerido",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "El correo proporcionado no es válido",
                  },
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextInput<UserModel.UserValues>
                fullWidth
                margin="normal"
                label="Género"
                name="gender"
                required
                defaultValue={profile.gender || ""}
                select
                control={control}
                rules={{
                  required: "El campo es requerido",
                }}
              >
                {Object.values(Genders).map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </TextInput>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextInput<UserModel.UserValues>
                fullWidth
                margin="normal"
                label="Tipo de ciclista"
                name="cyclistType"
                required
                defaultValue={profile.cyclistType || ""}
                select
                control={control}
                rules={{
                  required: "El campo es requerido",
                }}
              >
                {Object.values(CyclistTypes).map((cyclistType) => (
                  <MenuItem key={cyclistType} value={cyclistType}>
                    {cyclistType}
                  </MenuItem>
                ))}
              </TextInput>
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
