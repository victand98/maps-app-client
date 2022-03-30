import { stringAvatar } from "@lib";
import { Route } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React, { FC, Fragment } from "react";
import { StatusBadge } from "..";
import { UIRoute } from "./UIRoute";

export const RouteDetails: FC<UIRoute.RouteDetailsProps> = (props) => {
  const { route } = props;

  return (
    <Fragment>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <StatusBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                color={route.endTime ? "secondary" : "warning"}
              >
                <Avatar
                  sx={{
                    height: 64,
                    width: 64,
                    bgcolor: deepPurple[500],
                  }}
                >
                  <Route />
                </Avatar>
              </StatusBadge>

              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
                textAlign="center"
                marginTop={2}
              >
                {route.name}
              </Typography>

              <Typography color="textSecondary" variant="body2">
                Biclicleta <strong>{route.bikeType}</strong>
              </Typography>

              <Typography color="textSecondary" variant="body2">
                {route.purpose}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <StatusBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                color={route.user.status ? "secondary" : "error"}
              >
                <Avatar
                  {...stringAvatar(
                    `${route.user.firstName} ${route.user.lastName}`,
                    {
                      height: 64,
                      width: 64,
                    }
                  )}
                />
              </StatusBadge>

              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
                textAlign="center"
                marginTop={2}
              >
                {route.user.firstName} {route.user.lastName}
              </Typography>

              <Typography color="textSecondary" variant="body2">
                {route.user.cyclistType}
              </Typography>

              <Typography color="textSecondary" variant="body2">
                {route.user.email}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stepper
                activeStep={route.endTime ? 3 : 1}
                orientation="vertical"
              >
                <Step>
                  <StepLabel optional={route.startTime}>
                    Hora de inicio
                  </StepLabel>
                </Step>

                <Step>
                  <StepLabel>Ruta en curso</StepLabel>
                </Step>

                <Step>
                  <StepLabel optional={route.endTime || "Por definir"}>
                    Hora de finalización
                  </StepLabel>
                </Step>
              </Stepper>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Fragment>
  );
};
