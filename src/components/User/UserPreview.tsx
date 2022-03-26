import { getInitials, userPreviewState } from "@lib";
import { KeyboardReturn, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { useRecoilState } from "recoil";
import { Link } from "..";

export const UserPreview: FC = (props) => {
  const [userPreview] = useRecoilState(userPreviewState);
  const { email, firstName, lastName } = userPreview;

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
            sx={{
              height: 64,
              mb: 2,
              width: 64,
              bgcolor: "InfoText",
            }}
          >
            {firstName && lastName ? (
              getInitials(`${firstName} ${lastName}`)
            ) : (
              <Person />
            )}
          </Avatar>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
            textAlign="center"
          >
            {firstName || (
              <Skeleton
                variant="text"
                width={100}
                sx={{ display: "inline-flex" }}
              />
            )}{" "}
            {lastName || (
              <Skeleton
                variant="text"
                width={100}
                sx={{ display: "inline-flex" }}
              />
            )}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {email || <Skeleton variant="text" width={100} />}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Usuario
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Link href="/panel/usuarios" passHref withAnchor={false}>
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
