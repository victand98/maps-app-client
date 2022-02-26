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
  IconButton,
  Typography,
} from "@mui/material";
import { lime } from "@mui/material/colors";
import { formatDistance } from "date-fns";
import React, { FC } from "react";
import { IPlace } from "./IPlace";

export const PlaceInfo: FC<IPlace.PlaceInfoProps> = (props) => {
  const { place, handleClose } = props;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: lime[500] }}
            aria-label={place?.name}
            src={`/images/${place?.type.icon}`}
          ></Avatar>
        }
        action={
          <IconButton aria-label="configuración">
            <MoreVert />
          </IconButton>
        }
        title={place?.name}
        subheader={place?.type.name}
      />
      <CardMedia
        component="img"
        height="194"
        image="/images/Loja.jpg"
        alt="Loja"
      />
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
            {place?.name}
          </Typography>
          {place?.spots && place.occupied ? (
            <>
              <Typography color="InfoText" variant="body2">
                {place.spots - place.occupied} espacios disponibles
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {place?.occupied} espacios ocupados
              </Typography>
            </>
          ) : (
            <Typography color="textSecondary" variant="body2">
              {place?.type.description}
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
              {place?.updatedAt
                ? formatDistance(new Date(place?.updatedAt), new Date(), {
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
