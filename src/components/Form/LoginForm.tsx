import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { LoginFormValues } from "@types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TextInput } from "..";

export const LoginForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    const res = await signIn<any>("credentials", {
      email,
      password,
      callbackUrl: (router.query.returnUrl as string) || "/panel",
      redirect: false,
    });

    if (res?.error) {
      res.error === "CredentialsSignin"
        ? toast.error("Las credenciales de acceso no son válidas")
        : toast.error(
            "Ha ocurrido un error inesperado, por favor vuelva a intentarlo"
          );
    }
    if (res?.url) router.push(res.url);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      sx={{ mt: 1 }}
    >
      <TextInput<LoginFormValues>
        defaultValue=""
        required
        margin="normal"
        fullWidth
        id="email"
        name="email"
        label="Correo Electrónico"
        placeholder="usuario@correo.com"
        autoFocus
        control={control}
        rules={{
          pattern: {
            value:
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            message: "El correo no es válido",
          },
          required: "El campo es requerido",
        }}
      />

      <TextInput<LoginFormValues>
        type="password"
        defaultValue=""
        required
        margin="normal"
        fullWidth
        id="password"
        name="password"
        label="Contraseña"
        placeholder="***********"
        control={control}
        rules={{
          required: "El campo es requerido",
          minLength: { value: 4, message: "Escriba al menos 4 caracteres" },
        }}
      />

      <LoadingButton
        loading={isSubmitting}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Ingresar
      </LoadingButton>
    </Box>
  );
};
