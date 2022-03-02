import { AuthService, useRequest } from "@lib";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { LoginFormValues, LoginResponse } from "@types";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TextInput } from "..";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const router = useRouter();
  const { doRequest } = useRequest<LoginResponse>({
    request: AuthService.login,
    onSuccess: (data) => {
      const returnUrl = (router.query.returnUrl as string) || "/panel";
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
  } = useForm<LoginFormValues>();

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    // doRequest(data);

    const res = await signIn<any>("credentials", {
      email,
      password,
      callbackUrl: "/panel",
      redirect: false,
    });

    if (res?.error) console.log("error", res.error);
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
