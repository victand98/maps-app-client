import { usePagination } from "@lib";
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
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { format } from "date-fns";
import React, { FC } from "react";
import { Link } from "..";
import { UIRoute } from "./UIRoute";

export const MyRoutesListResults: FC<UIRoute.MyRoutesListResultsProps> = (
  props
) => {
  const { myRoutes } = props;

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
              <TableCell>Detalles</TableCell>
              <TableCell>Historial</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {myRoutes.slice(0, limit).map((myRoute) => (
              <TableRow hover key={myRoute.id}>
                <TableCell padding="normal">
                  <Link href={`/panel/rutas/${myRoute.id}`} passHref>
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
                        {myRoute.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="GrayText"
                        display="inline-block"
                      >
                        Bicicleta
                      </Typography>{" "}
                      <Typography variant="caption" display="inline-block">
                        {myRoute.bikeType}
                      </Typography>
                      <Typography color="green" variant="body2">
                        {myRoute.purpose}
                      </Typography>
                    </div>
                  </Box>
                </TableCell>

                <TableCell>
                  <Stepper
                    activeStep={myRoute.endTime ? 3 : 1}
                    orientation="vertical"
                  >
                    <Step>
                      <StepLabel optional={myRoute.startTime}>
                        Hora de inicio
                      </StepLabel>
                    </Step>

                    <Step>
                      <StepLabel>Ruta en curso</StepLabel>
                    </Step>

                    <Step>
                      <StepLabel optional={myRoute.endTime || "Por definir"}>
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
                    {format(new Date(myRoute.createdAt), "Pp")}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Última actualización
                  </Typography>
                  <Typography variant="subtitle2" display="block">
                    {format(new Date(myRoute.updatedAt), "Pp")}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={myRoutes.length}
        onPageChange={onPageChange}
        onRowsPerPageChange={onLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
