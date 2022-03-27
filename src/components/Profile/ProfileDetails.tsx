import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import React, { FC } from "react";
import { IProfile } from "./IProfile";

export const ProfileDetails: FC<IProfile.ProfileDetailsProps> = (props) => {
  const { profile } = props;

  return (
    <Card>
      <CardHeader
        title={`${profile.firstName} ${profile.lastName}`}
        subheader="Perfil de usuario"
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              defaultValue={profile.firstName}
              label="Nombres"
              name="firstName"
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              defaultValue={profile.lastName}
              label="Apellidos"
              name="lastName"
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="email"
              fullWidth
              defaultValue={profile.email}
              label="Correo"
              name="email"
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
};
