import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { FC } from "react";
import { IPlace } from "./IPlace";
import { MoreVert } from "@mui/icons-material";

export const PlaceInfo: FC<IPlace.PlaceInfoProps> = (props) => {
  const { place } = props;

  return (
    <Card {...props}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], color: "white" }}
            aria-label="recipe"
            src={`/images/${place?.type.icon}`}
          ></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={`/images/${place?.type.icon}`}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {place?.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {`${place?.kind} ${place?.id}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {place?.createdAt}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
