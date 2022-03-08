import { placePreviewState } from "@lib";
import { KeyboardReturn, Place } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Icon,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { useRecoilState } from "recoil";
import { Link } from "..";

export const PlacePreview: FC = (props) => {
  const [placePreview] = useRecoilState(placePreviewState);

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {placePreview.type ? (
            <Avatar
              sx={{
                height: 64,
                mb: 2,
                width: 64,
                bgcolor: placePreview.type.color,
              }}
            >
              <Icon>{placePreview.type.icon}</Icon>
            </Avatar>
          ) : (
            <Avatar
              sx={{
                height: 64,
                mb: 2,
                width: 64,
                bgcolor: "primary",
              }}
            >
              <Place />
            </Avatar>
          )}
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h6"
            align="center"
          >
            {placePreview.name || <Skeleton variant="text" width={100} />}
          </Typography>
          {placePreview.occupied !== undefined &&
            placePreview.spots !== undefined && (
              <Typography color="InfoText" variant="body2">
                {placePreview.occupied} espacios ocupados de{" "}
                {placePreview.spots}
              </Typography>
            )}
          <Typography color="textSecondary" variant="body2" gutterBottom>
            {placePreview.location.coordinates || (
              <Skeleton variant="text" width={175} />
            )}
          </Typography>

          <Typography color="textSecondary" variant="caption" align="center">
            {placePreview.formattedAddress || (
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  width={185}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  sx={{ margin: "0 auto" }}
                />
              </React.Fragment>
            )}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Link href="/panel/lugares" passHref withAnchor={false}>
          <Tooltip
            title="Los cambios se perderán si realiza esta acción"
            placement="top"
          >
            <Button
              color="primary"
              fullWidth
              variant="text"
              startIcon={<KeyboardReturn />}
            >
              Regresar
            </Button>
          </Tooltip>
        </Link>
      </CardActions>
    </Card>
  );
};
