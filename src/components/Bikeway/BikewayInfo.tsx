import { Feedback, Settings, Signpost, Update } from "@mui/icons-material";
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
import { formatDistance } from "date-fns";
import { LatLngExpression } from "leaflet";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { FC, useMemo } from "react";
import { Link } from "..";
import { IBikeway } from "./IBikeway";

const BikewayMinimap = dynamic(
  () => import("@components/Map/ChildElements/BikewayMinimap"),
  {
    ssr: false,
  }
);

export const BikewayInfo: FC<IBikeway.BikewayInfoProps> = (props) => {
  const { bikeway, handleClose } = props;
  const { data } = useSession();
  const positions = useMemo<LatLngExpression[]>(
    () =>
      bikeway.location.coordinates.map((coordinate) => [
        coordinate[1],
        coordinate[0],
      ]) as LatLngExpression[],
    [bikeway.location.coordinates]
  );

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: bikeway.color, opacity: bikeway.opacity }}
            aria-label={bikeway.name}
          >
            <Signpost />
          </Avatar>
        }
        action={
          data ? (
            <Link href="/panel/ciclovias" withAnchor={false} passHref>
              <IconButton aria-label="configuración">
                <Settings />
              </IconButton>
            </Link>
          ) : null
        }
        title={bikeway.name}
        subheader="Ciclovía"
      />
      <CardMedia sx={{ height: "250px" }}>
        <BikewayMinimap
          name={bikeway.name}
          positions={positions}
          color={bikeway.color}
          opacity={bikeway.opacity}
          width={bikeway.width}
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
            {bikeway.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <Feedback color="disabled" fontSize="small" />
            <Typography color="textSecondary" variant="body2" gutterBottom>
              {bikeway.description || "Sin información"}
            </Typography>
          </Box>
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
              {bikeway.updatedAt
                ? formatDistance(new Date(bikeway.updatedAt), new Date(), {
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
