import { parkingPointPreviewState } from "@lib";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { useRecoilState } from "recoil";

export const ParkingPointPreview: FC = (props) => {
  const [parkingPointPreview] = useRecoilState(parkingPointPreviewState);

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
          <Avatar
            src={`/images/parking.svg`}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
              bgcolor: "red",
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h6"
            align="center"
          >
            {parkingPointPreview.name || (
              <Skeleton variant="text" width={100} />
            )}
          </Typography>
          <Typography color="InfoText" variant="body2">
            {parkingPointPreview.occupied} espacios ocupados de{" "}
            {parkingPointPreview.spots}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {parkingPointPreview.location.coordinates || (
              <Skeleton variant="text" width={175} />
            )}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Vista Previa
        </Button>
      </CardActions>
    </Card>
  );
};
