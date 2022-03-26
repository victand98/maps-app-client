import {
  getStandChipColor,
  PlaceService,
  toastErrors,
  usePagination,
  useParkingPoint,
  useRequest,
} from "@lib";
import { DirectionsBike, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Chip,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { ParkingPointModel } from "@types";
import { format } from "date-fns";
import React, { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { StandHistoryDialog } from ".";
import { IParkingPointStand } from "./ParkingPointStand";
import { UpdateStandForm, UpdateStandStatusForm } from "./StandForm";

export const ParkingPointStandListResults: FC<
  IParkingPointStand.ParkingPointStandListResultsProps
> = (props) => {
  const { parkingPointStands } = props;

  const { mutate } = useParkingPoint();
  const [open, setOpen] = useState(false);
  const [openStandHistory, setOpenStandHistory] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const { limit, onLimitChange, onPageChange, page } = usePagination({
    initialLimit: 10,
    initialPage: 0,
  });
  const [currentParkingPointStand, setCurrentParkingPointStand] =
    useState<ParkingPointModel.ParkingPointStand>();
  const [currentStandHistory, setCurrentStandHistory] =
    useState<ParkingPointModel.CurrentStandHistory>();

  const { doRequest, loading } =
    useRequest<ParkingPointModel.ParkingPointStand>({
      request: PlaceService.update,
      onSuccess: (data) => {
        toast.success("Estado actualizado");
        mutate();
      },
      onError: (error) => {
        toastErrors(error);
      },
    });

  const handleClose = () => {
    setOpen(false);
    setCurrentParkingPointStand(undefined);
    mutate();
  };

  const handleCloseStandHistory = () => {
    setOpenStandHistory(false);
    setCurrentStandHistory(undefined);
  };

  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
    setCurrentParkingPointStand(undefined);
    mutate();
  };

  if (!parkingPointStands) return null;

  return (
    <Card>
      <Box sx={{ minWidth: 375 }} className="container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="normal"></TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Ocupado por</TableCell>
              <TableCell>Historial</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {parkingPointStands.slice(0, limit).map((parkingPointStand) => (
              <TableRow hover key={parkingPointStand.id}>
                <TableCell padding="normal">
                  <Tooltip title="Editar">
                    <IconButton
                      color="primary"
                      aria-label="editar"
                      onClick={() => {
                        setOpen(true);
                        setCurrentParkingPointStand(parkingPointStand);
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
                    <Avatar sx={{ mr: 2, bgcolor: "InfoText" }}>
                      <DirectionsBike />
                    </Avatar>

                    <Typography color="textPrimary" variant="body1">
                      Puesto #{parkingPointStand.number}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  <Chip
                    color={getStandChipColor(parkingPointStand.status)}
                    label={parkingPointStand.status}
                    onClick={() => {
                      setCurrentParkingPointStand(parkingPointStand);
                      setOpenStatusDialog(true);
                    }}
                    disabled={loading}
                  />
                </TableCell>

                <TableCell>
                  {parkingPointStand.currentStandHistory ? (
                    <Fragment>
                      <Typography variant="subtitle1">
                        {parkingPointStand.currentStandHistory.user.firstName}{" "}
                        {parkingPointStand.currentStandHistory.user.lastName}
                      </Typography>

                      <Link
                        component="button"
                        variant="body2"
                        underline="hover"
                        onClick={() => {
                          setCurrentStandHistory(
                            parkingPointStand.currentStandHistory!
                          );
                          setOpenStandHistory(true);
                        }}
                      >
                        Ver detalles
                      </Link>
                    </Fragment>
                  ) : (
                    <Typography variant="caption">Sin ocupar</Typography>
                  )}
                </TableCell>

                <TableCell>
                  <Typography variant="caption" display="block">
                    Creado el
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {format(new Date(parkingPointStand.createdAt), "Pp")}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Última actualización
                  </Typography>
                  <Typography variant="subtitle2" display="block">
                    {format(new Date(parkingPointStand.updatedAt), "Pp")}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={parkingPointStands.length}
        onPageChange={onPageChange}
        onRowsPerPageChange={onLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {currentParkingPointStand && (
        <UpdateStandForm
          currentParkingPointStand={currentParkingPointStand}
          open={open}
          onClose={handleClose}
        />
      )}

      {currentParkingPointStand && (
        <UpdateStandStatusForm
          currentParkingPointStand={currentParkingPointStand}
          open={openStatusDialog}
          onClose={handleCloseStatusDialog}
        />
      )}

      {currentStandHistory && (
        <StandHistoryDialog
          currentStandHistory={currentStandHistory}
          open={openStandHistory}
          onClose={handleCloseStandHistory}
        />
      )}
    </Card>
  );
};
