import { stringAvatar, usePagination } from "@lib";
import { RemoveRedEye, Route } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  Link as MaterialLink,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { format } from "date-fns";
import React, { FC } from "react";
import { Link, StatusBadge } from "..";
import { UIRoute } from "./UIRoute";

export const RoutesListResults: FC<UIRoute.RoutesListResultsProps> = (
  props
) => {
  const { routes } = props;

  const { limit, onLimitChange, onPageChange, page } = usePagination({
    initialLimit: 10,
    initialPage: 0,
  });

  return (
    <Card>
      <Box sx={{ minWidth: 375 }} className="container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="normal"></TableCell>
              <TableCell>Ruta</TableCell>
              <TableCell>Ciclista</TableCell>
              <TableCell>Detalles</TableCell>
              <TableCell>Historial</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {routes.slice(0, limit).map((route) => (
              <TableRow hover key={route.id}>
                <TableCell padding="normal">
                  <Link href={`/panel/rutas/${route.id}`} passHref>
                    <Tooltip title="Ver Detalles">
                      <IconButton color="primary" aria-label="Ver Detalles">
                        <RemoveRedEye />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </TableCell>

                <TableCell padding="normal">
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      sx={{
                        mr: 2,
                        bgcolor: deepPurple[500],
                      }}
                    >
                      <Route />
                    </Avatar>
                    <div>
                      <Typography color="textPrimary" variant="body1">
                        {route.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="GrayText"
                        display="inline-block"
                      >
                        Bicicleta
                      </Typography>{" "}
                      <Typography variant="caption" display="inline-block">
                        {route.bikeType}
                      </Typography>
                      <Typography color="green" variant="body2">
                        {route.purpose}
                      </Typography>
                    </div>
                  </Box>
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
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
                          `${route.user.firstName} ${route.user.lastName}`
                        )}
                      />
                    </StatusBadge>

                    <Box sx={{ ml: 2 }}>
                      <Typography color="textPrimary" variant="body1">
                        {route.user.firstName} {route.user.lastName}
                      </Typography>

                      <Typography color="blueviolet" variant="caption">
                        {route.user.cyclistType}
                      </Typography>

                      <Typography color="GrayText" variant="body2">
                        {route.user.email}
                      </Typography>

                      <Link
                        href={`/panel/perfil/${route.user.id}`}
                        passHref
                        withAnchor={false}
                      >
                        <MaterialLink
                          variant="subtitle2"
                          color="GrayText"
                          underline="hover"
                        >
                          Ver Perfil
                        </MaterialLink>
                      </Link>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
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
                </TableCell>

                <TableCell>
                  <Typography variant="caption" display="block">
                    Creado el
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {format(new Date(route.createdAt), "Pp")}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Última actualización
                  </Typography>
                  <Typography variant="subtitle2" display="block">
                    {format(new Date(route.updatedAt), "Pp")}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={routes.length}
        onPageChange={onPageChange}
        onRowsPerPageChange={onLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
