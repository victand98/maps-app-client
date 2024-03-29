import {
  PlaceService,
  PlaceTypes,
  toastErrors,
  usePagination,
  usePlaces,
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
  Link as MaterialLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { PlaceModel } from "@types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { PlaceEditForm } from ".";
import { Link } from "..";
import { IPlace } from "./IPlace";

export const PlaceListResults: FC<IPlace.IPlaceListResultsProps> = (props) => {
  const { places, placeTypes } = props;
  const { data: session } = useSession();
  const { mutate } = usePlaces();
  const [open, setOpen] = useState(false);
  const { limit, onLimitChange, onPageChange, page } = usePagination({
    initialLimit: 10,
    initialPage: 0,
  });
  const [currentPlace, setCurrentPlace] = useState<PlaceModel.PlaceResponse>();

  const { doRequest, loading } = useRequest({
    request: PlaceService.update,
    onSuccess: (data) => {
      toast.success("Estado actualizado");
      mutate();
    },
    onError: (error) => {
      toastErrors(error);
    },
  });

  const toggleStatus = (currentStatus: boolean, id: string) => {
    doRequest({ status: !currentStatus }, id, session!);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPlace(undefined);
    mutate();
  };

  if (!places) return null;

  return (
    <Card>
      <Box sx={{ minWidth: 375 }} className="container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="normal"></TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Historial</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {places.slice(0, limit).map((place) => (
              <TableRow hover key={place.id}>
                <TableCell padding="normal">
                  <Tooltip title="Editar">
                    <IconButton
                      color="primary"
                      aria-label="editar"
                      onClick={() => {
                        setOpen(true);
                        setCurrentPlace(place);
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
                    <Avatar sx={{ mr: 2, bgcolor: place.type.color }}>
                      <Icon>{place.type.icon}</Icon>
                    </Avatar>
                    <div>
                      <Typography color="textPrimary" variant="body1">
                        {place.name}
                      </Typography>
                      {place.type.name === PlaceTypes.parking && (
                        <Fragment>
                          {place.openingTime && place.closingTime ? (
                            <Typography color="green" variant="body2">
                              {place.openingTime} hasta {place.closingTime}
                            </Typography>
                          ) : (
                            <Typography color="green" variant="body2">
                              Horario no definido
                            </Typography>
                          )}
                          <Link
                            href={`/panel/estacionamientos/${place.id}`}
                            passHref
                            withAnchor={false}
                          >
                            <MaterialLink
                              variant="subtitle2"
                              color="GrayText"
                              underline="hover"
                            >
                              Ver
                            </MaterialLink>
                          </Link>
                        </Fragment>
                      )}
                    </div>
                  </Box>
                </TableCell>

                <TableCell>
                  {place.status ? (
                    <Chip
                      icon={<ToggleOn />}
                      color="success"
                      label="Activo"
                      onClick={() => toggleStatus(place.status, place.id)}
                      disabled={loading}
                    />
                  ) : (
                    <Chip
                      icon={<ToggleOff />}
                      color="default"
                      label="Inactivo"
                      onClick={() => toggleStatus(place.status, place.id)}
                      disabled={loading}
                    />
                  )}
                </TableCell>

                <TableCell>
                  <Typography>{place.type.name}</Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="caption" display="block">
                    Creado el
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {format(new Date(place.createdAt), "Pp")}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Última actualización
                  </Typography>
                  <Typography variant="subtitle2" display="block">
                    {format(new Date(place.updatedAt), "Pp")}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={places.length}
        onPageChange={onPageChange}
        onRowsPerPageChange={onLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {currentPlace && (
        <PlaceEditForm
          placeTypes={placeTypes}
          currentPlace={currentPlace}
          open={open}
          onClose={handleClose}
        />
      )}
    </Card>
  );
};
