import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@mui/material";
import L from "leaflet";
import "leaflet.offline";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LinearProgressWithLabel } from "..";
import Map from "./Map";

const MapOffline: FC = (props) => {
  const { children } = props;
  const [map, setMap] = useState<L.Map>();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (map) {
      const tileLayerOffline = L.tileLayer.offline(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          subdomains: "abc",
          minZoom: 13,
          maxZoom: 17,
        }
      );

      tileLayerOffline.addTo(map);

      const controlSaveTiles = L.control.savetiles(tileLayerOffline, {
        zoomlevels: [13, 14, 15, 16, 17],
        position: "topleft",
        confirm(layer, successcallback) {
          if (
            window.confirm(
              `¿Desea descargar ${layer._tilesforSave.length} recursos de Mapas Offline?`
            )
          ) {
            try {
              successcallback();
            } catch (error) {
              console.log("error", error);
            }
          }
        },
        confirmRemoval(layer, successCallback) {
          if (
            window.confirm("¿Eliminar todos los recursos Offline descargados?")
          ) {
            successCallback();
          }
        },
        saveText:
          '<svg xmlns="http://www.w3.org/2000/svg" class="maps-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>',
        rmText:
          '<svg xmlns="http://www.w3.org/2000/svg" class="maps-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>',
      });

      controlSaveTiles.addTo(map);

      tileLayerOffline.on("savestart", (e) => {
        setProgress(0);
        setTotal(e._tilesforSave.length);
        setOpen(true);
      });

      tileLayerOffline.on("savetileend", () => {
        setProgress((prevProgress) => prevProgress + 1);
      });

      tileLayerOffline.on("saveend", (e) => {
        toast.info(
          `Se han descargado ${e.lengthSaved} de ${e.lengthToBeSaved} recursos.`
        );
      });
    }
  }, [map]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Map minZoom={13} maxZoom={17} whenCreated={setMap}>
      {children}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Descarga de Recursos</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Mapas Offline
          </DialogContentText>
          <LinearProgressWithLabel value={(progress / total) * 100} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Map>
  );
};

export default MapOffline;
