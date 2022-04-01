import { RouteService, toastErrors, useRequest, Permissions } from "@lib";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import fileDownload from "js-file-download";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";
import { FaFileCsv } from "react-icons/fa";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { WithPermissions } from "..";
import { UIRoute } from "./UIRoute";

export const RoutesListToolbar: FC<UIRoute.RoutesListToolbarProps> = (
  props
) => {
  const { doRequest, loading } = useRequest({
    request: RouteService.downloadCSV,
    onSuccess: (response) => {
      fileDownload(response.data, `rutas-${uuid()}.csv`);
      toast.success("Su archivo CSV se ha decargado");
    },
    onError: (err) => {
      toastErrors(err);
    },
  });

  const downloadCSV = () => {
    doRequest();
  };

  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Rutas
        </Typography>
        <Box sx={{ m: 1 }}>
          <WithPermissions permission={Permissions["download:routes"]}>
            <LoadingButton
              loading={loading}
              color="secondary"
              variant="contained"
              startIcon={<FaFileCsv />}
              onClick={downloadCSV}
            >
              Descargar
            </LoadingButton>
          </WithPermissions>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <BiSearch />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Buscar ruta"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
