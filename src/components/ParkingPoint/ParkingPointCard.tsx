import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  SvgIcon,
  Typography,
} from "@mui/material";
import { formatDistance } from "date-fns";
import React, { FC } from "react";
import { BiCycling } from "react-icons/bi";
import { MdUpdate } from "react-icons/md";
import { IParkingPoint } from "./ParkingPoint";

export const ParkingPointCard: FC<IParkingPoint.ParkingPointCardProps> = (
  props
) => {
  const { parkingPoint } = props;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar
            alt="Product"
            src={`/images/${parkingPoint.type.icon}`}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {parkingPoint.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {parkingPoint.occupied} Espacios ocupados
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {parkingPoint.spots - parkingPoint.occupied} Disponibles
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <SvgIcon color="action">
              <MdUpdate />
            </SvgIcon>
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {formatDistance(new Date(parkingPoint.updatedAt), new Date(), {
                addSuffix: true,
              })}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <SvgIcon color="action">
              <BiCycling />
            </SvgIcon>
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {parkingPoint.spots} Espacios
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
