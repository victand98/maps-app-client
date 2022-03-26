import { AuthService, handleFormError, useRequest } from "@lib";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { SignupFormValues } from "@types";
import { useRouter } from "next/router";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { TextInput } from "..";

export const SignupForm = () => {
  const router = useRouter();

  const { doRequest, loading } = useRequest({
    request: AuthService.signup,
    onSuccess: (data) => {
      toast.success("Cuenta registrada con éxito");
      const returnUrl = (router.query.returnUrl as string) || "/ingresar";
      router.push(returnUrl);
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });

  const { control, handleSubmit, setError } = useForm<SignupFormValues>();

  const password = useWatch({ control, name: "password", defaultValue: "" });
  const repeatPassword = useWatch({
    control,
    name: "repeatPassword",
    defaultValue: "",
  });

  const onSubmit = async (data: SignupFormValues) => {
    doRequest(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      sx={{ mt: 1 }}
    >
      <TextInput<SignupFormValues>
        fullWidth
        defaultValue=""
        label="Nombres"
        name="firstName"
        placeholder="Jhon Fernando"
        required
        variant="outlined"
        margin="normal"
        control={control}
        autoFocus
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

      <TextInput<SignupFormValues>
        fullWidth
        defaultValue=""
        label="Apellidos"
        name="lastName"
        placeholder="Gonzales Torres"
        required
        variant="outlined"
        margin="normal"
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

      <TextInput<SignupFormValues>
        defaultValue=""
        required
        margin="normal"
        fullWidth
        id="email"
        name="email"
        label="Correo Electrónico"
        placeholder="usuario@correo.com"
        helperText="El correo ingresado servirá para su inicio de sesión"
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

      <TextInput<SignupFormValues>
        type="password"
        defaultValue=""
        required
        margin="normal"
        fullWidth
        id="password"
        name="password"
        label="Contraseña"
        placeholder="***********"
        helperText="Escriba una contraseña segura"
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

      <TextInput<SignupFormValues>
        type="password"
        fullWidth
        defaultValue=""
        label="Repetir Contraseña"
        name="repeatPassword"
        placeholder="**********"
        helperText="Repita la contraseña ingresada"
        required
        variant="outlined"
        margin="normal"
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

      <LoadingButton
        loading={loading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Registrarse
      </LoadingButton>
    </Box>
  );
};
