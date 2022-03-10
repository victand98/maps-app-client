import { PlaceTypes } from "@lib";
import { DirectionsBike, Place, Settings, Update } from "@mui/icons-material";
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
  Tooltip,
  Typography,
} from "@mui/material";
import { formatDistance } from "date-fns";
import { LatLngExpression } from "leaflet";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { FC, useMemo } from "react";
import { Link } from "..";
import { IPlace } from "./IPlace";

const PlaceMinimap = dynamic(
  () => import("@components/Map/ChildElements/PlaceMinimap"),
  {
    ssr: false,
  }
);

export const PlaceInfo: FC<IPlace.PlaceInfoProps> = (props) => {
  const { place, handleClose } = props;
  const { data } = useSession();
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
          data ? (
            <Link href="/panel/lugares" withAnchor={false} passHref>
              <IconButton aria-label="configuración">
                <Settings />
              </IconButton>
            </Link>
          ) : null
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
          <Typography color="textPrimary" align="center" variant="h6">
            {place.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <Place color="disabled" fontSize="small" />
            <Typography color="textSecondary" variant="body2" gutterBottom>
              {place.formattedAddress ||
                place.type.description ||
                "Sin información"}
            </Typography>
          </Box>

          {place.type.name === PlaceTypes.parking && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 2,
              }}
            >
              <Box
                sx={{
                  p: 1,
                  textAlign: "center",
                }}
              >
                <DirectionsBike color="action" />
                <Typography color="textPrimary" variant="body1">
                  Ocupados
                </Typography>
                <Tooltip title="Espacios de estacionamiento ocupados" arrow>
                  <Typography
                    style={{ color: "red", cursor: "pointer" }}
                    variant="h4"
                  >
                    {place.occupied}
                  </Typography>
                </Tooltip>
              </Box>

              <Box
                sx={{
                  p: 1,
                  textAlign: "center",
                }}
              >
                <DirectionsBike color="action" />
                <Typography color="textPrimary" variant="body1">
                  Disponibles
                </Typography>
                <Tooltip title="Espacios de estacionamiento disponibles" arrow>
                  <Typography
                    style={{ color: "green", cursor: "pointer" }}
                    variant="h4"
                  >
                    {place.spots! - place.occupied!}
                  </Typography>
                </Tooltip>
              </Box>
            </Box>
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
