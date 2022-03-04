import { getInitials } from "@lib";
import { ToggleOff, ToggleOn } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React, { FC, useState } from "react";
import { IPlaceType } from "./IPlaceType";

export const PlaceTypeListResults: FC<IPlaceType.IPlaceTypeListResultsProps> = (
  props
) => {
  const { placeTypes } = props;
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  if (!placeTypes) return null;

  return (
    <Card>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                {/* <Checkbox
                  checked={selectedCustomerIds.length === customers.length}
                  color="primary"
                  indeterminate={
                    selectedCustomerIds.length > 0 &&
                    selectedCustomerIds.length < customers.length
                  }
                  onChange={handleSelectAll}
                /> */}
              </TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Historial</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {placeTypes.slice(0, limit).map((placeType) => (
              <TableRow hover key={placeType.id}>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    checked={selectedCustomerIds.indexOf(placeType.id) !== -1}
                    onChange={(event) => handleSelectOne(event, placeType.id)}
                    value="true"
                  /> */}
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Avatar sx={{ mr: 2, bgcolor: placeType.color }}>
                      <Icon>{placeType.icon}</Icon>
                    </Avatar>
                    <Typography color="textPrimary" variant="body1">
                      {placeType.name}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  {placeType.status ? (
                    <Chip icon={<ToggleOn />} color="success" label="Activo" />
                  ) : (
                    <Chip
                      icon={<ToggleOff />}
                      color="default"
                      label="Inactivo"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Typography noWrap>{placeType.description}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption" display="block">
                    Creado el
                  </Typography>
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    {format(new Date(placeType.createdAt), "dd/MM/yyyy")}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Última actualización
                  </Typography>
                  <Typography variant="subtitle2" display="block">
                    {format(new Date(placeType.updatedAt), "dd/MM/yyyy")}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={placeTypes.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
