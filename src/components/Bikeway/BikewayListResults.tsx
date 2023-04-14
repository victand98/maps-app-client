import {
  BikewayService,
  toastErrors,
  useBikeways,
  usePagination,
  useRequest,
} from "@lib";
import { Edit, Signpost, ToggleOff, ToggleOn } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Chip,
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
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { toast } from "react-toastify";
import { Link } from "..";
import { IBikeway } from "./IBikeway";

export const BikewayListResults: FC<IBikeway.IBikewayListResultsProps> = (
  props
) => {
  const { bikeways } = props;
  const { data: session } = useSession();
  const { mutate } = useBikeways();
  const { limit, onLimitChange, onPageChange, page } = usePagination({
    initialLimit: 10,
    initialPage: 0,
  });

  const { doRequest, loading } = useRequest({
    request: BikewayService.update,
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

  if (!bikeways) return null;

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
            {bikeways.slice(0, limit).map((bikeway) => (
              <TableRow hover key={bikeway.id}>
                <TableCell padding="normal">
                  <Link
                    href={`/panel/ciclovias/${bikeway.id}`}
                    withAnchor={false}
                    passHref
                  >
                    <Tooltip title="Editar">
                      <IconButton color="primary" aria-label="editar">
                        <Edit />
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
                        bgcolor: bikeway.color,
                        opacity: bikeway.opacity,
                      }}
                    >
                      <Signpost />
                    </Avatar>
                    <Typography color="textPrimary" variant="body1">
                      {bikeway.name}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  {bikeway.status ? (
                    <Chip
                      icon={<ToggleOn />}
                      color="success"
                      label="Activa"
                      onClick={() => toggleStatus(bikeway.status, bikeway.id)}
                      disabled={loading}
                    />
                  ) : (
                    <Chip
                      icon={<ToggleOff />}
                      color="default"
                      label="Inactiva"
                      onClick={() => toggleStatus(bikeway.status, bikeway.id)}
                      disabled={loading}
                    />
                  )}
                </TableCell>

                <TableCell>
                  <Typography variant="caption">Detalles</Typography>
                  <Typography variant="body2" gutterBottom>
                    {bikeway.description}
                  </Typography>

                  <Typography variant="caption">Propiedades</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2" color="CaptionText">
                      Color:
                    </Typography>
                    <Box
                      sx={{
                        width: "16px",
                        height: "16px",
                        display: "inline-flex",
                        borderRadius: "16px",
                        marginLeft: "5px",
                        bgcolor: bikeway.color,
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2" color="CaptionText">
                      Opacidad:
                    </Typography>
                    <Box
                      sx={{
                        width: "16px",
                        height: "16px",
                        display: "inline-flex",
                        borderRadius: "16px",
                        marginLeft: "5px",
                        bgcolor: "gray",
                        opacity: bikeway.opacity,
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2" color="CaptionText">
                      Ancho:
                    </Typography>
                    <Box
                      sx={{
                        width: "45px",
                        height: `${bikeway.width}px`,
                        display: "inline-flex",
                        marginLeft: "5px",
                        bgcolor: "gray",
                      }}
                    />
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography variant="caption" display="block">
                    Creado el
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {format(new Date(bikeway.createdAt), "Pp")}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Última actualización
                  </Typography>
                  <Typography variant="subtitle2" display="block">
                    {format(new Date(bikeway.updatedAt), "Pp")}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={bikeways.length}
        onPageChange={onPageChange}
        onRowsPerPageChange={onLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
