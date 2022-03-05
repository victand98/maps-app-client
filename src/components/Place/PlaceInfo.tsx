import { MarkerDivIcon } from "@components/Icon";
import Marker from "@components/Map/ChildElements/Marker";
import { MoreVert, Update } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import { lime } from "@mui/material/colors";
import { formatDistance } from "date-fns";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import React, { FC, useMemo } from "react";
import { IPlace } from "./IPlace";

const PlaceMinimap = dynamic(
  () => import("@components/Map/ChildElements/PlaceMinimap"),
  {
    ssr: false,
  }
);

export const PlaceInfo: FC<IPlace.PlaceInfoProps> = (props) => {
  const { place, handleClose } = props;

  const position = useMemo<LatLngExpression>(
    () => ({
      lng: place.location.coordinates[0],
      lat: place.location.coordinates[1],
    }),
    [place.location.coordinates]
  );

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: place.type.color }} aria-label={place.name}>
            <Icon>{place.type.icon}</Icon>
          </Avatar>
        }
        action={
          <IconButton aria-label="configuración">
            <MoreVert />
          </IconButton>
        }
        title={place.name}
        subheader={place.type.name}
      />
      <CardMedia sx={{ height: "250px" }}>
        <PlaceMinimap
          center={position}
          icon={place.type.icon}
          name={place.name}
          position={position}
          color={place.type.color}
        />
      </CardMedia>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            color="textPrimary"
            gutterBottom
            align="center"
            variant="h5"
          >
            {place.name}
          </Typography>
          {place.spots && place.occupied ? (
            <>
              <Typography color="InfoText" variant="body2">
                {place.spots - place.occupied} espacios disponibles
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {place.occupied} espacios ocupados
              </Typography>
            </>
          ) : (
            <Typography color="textSecondary" variant="body2">
              {place.type.description}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Update color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {place.updatedAt
                ? formatDistance(new Date(place.updatedAt), new Date(), {
                    addSuffix: true,
                  })
                : null}
            </Typography>
          </Grid>

          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Button onClick={handleClose} autoFocus>
              Cerrar
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
