import {
  PlaceTypeService,
  toastErrors,
  usePagination,
  usePlaceTypes,
  useRequest,
} from "@lib";
import { Edit, ToggleOff, ToggleOn } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { PlaceTypeModel } from "@types";
import { format } from "date-fns";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { PlaceTypeEditForm } from ".";
import { IPlaceType } from "./IPlaceType";

export const PlaceTypeListResults: FC<IPlaceType.IPlaceTypeListResultsProps> = (
  props
) => {
  const { placeTypes, iconOptions } = props;
  const { mutate } = usePlaceTypes();
  const [open, setOpen] = useState(false);
  const { limit, onLimitChange, onPageChange, page } = usePagination({
    initialLimit: 10,
    initialPage: 0,
  });
  const [currentPlaceType, setCurrentPlaceType] =
    useState<PlaceTypeModel.PlaceTypeResponse>();

  const { doRequest } = useRequest<PlaceTypeModel.PlaceTypeResponse>({
    request: PlaceTypeService.update,
    onSuccess: (data) => {
      toast.success("Estado actualizado");
      mutate();
    },
    onError: (error) => {
      toastErrors(error);
    },
  });

  const toggleStatus = (currentStatus: boolean, id: string) => {
    doRequest({ status: !currentStatus }, id);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPlaceType(undefined);
    mutate();
  };

  if (!placeTypes) return null;

  return (
    <Card>
      <Box sx={{ minWidth: 375 }} className="container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="normal"></TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Historial</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {placeTypes.slice(0, limit).map((placeType) => (
              <TableRow hover key={placeType.id}>
                <TableCell padding="normal">
                  <Tooltip title="Editar">
                    <IconButton
                      color="primary"
                      aria-label="editar"
                      onClick={() => {
                        setOpen(true);
                        setCurrentPlaceType(placeType);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell padding="normal">
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
                    <Chip
                      icon={<ToggleOn />}
                      color="success"
                      label="Activo"
                      onClick={() =>
                        toggleStatus(placeType.status, placeType.id)
                      }
                    />
                  ) : (
                    <Chip
                      icon={<ToggleOff />}
                      color="default"
                      label="Inactivo"
                      onClick={() =>
                        toggleStatus(placeType.status, placeType.id)
                      }
                    />
                  )}
                </TableCell>

                <TableCell>
                  <Typography>{placeType.description}</Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="caption" display="block">
                    Creado el
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {format(new Date(placeType.createdAt), "Pp")}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Última actualización
                  </Typography>
                  <Typography variant="subtitle2" display="block">
                    {format(new Date(placeType.updatedAt), "Pp")}
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
        onPageChange={onPageChange}
        onRowsPerPageChange={onLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {currentPlaceType && (
        <PlaceTypeEditForm
          currentPlaceType={currentPlaceType}
          iconOptions={iconOptions}
          open={open}
          onClose={handleClose}
        />
      )}
    </Card>
  );
};
