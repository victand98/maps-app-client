import { getInitials } from "@lib";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { FC, useMemo } from "react";
import { Link, StatusBadge } from "..";
import { IProfile } from "./IProfile";

export const ProfileCard: FC<IProfile.ProfileCardProps> = (props) => {
  const { profile } = props;
  const { data } = useSession();

  const isOwnProfile = useMemo<boolean>(
    () => data!.user?.id === profile.id,
    [data, profile]
  );

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <StatusBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            color={profile.status ? "secondary" : "error"}
          >
            <Avatar
              sx={{
                height: 64,
                width: 64,
                bgcolor: "InfoText",
              }}
            >
              {getInitials(`${profile.firstName} ${profile.lastName}`)}
            </Avatar>
          </StatusBadge>

          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
            textAlign="center"
            marginTop={2}
          >
            {profile.firstName} {profile.lastName}
          </Typography>

          <Typography color="textSecondary" variant="body2">
            {profile.email}
          </Typography>

          <Typography color="textSecondary" variant="body2">
            {profile.role.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        {isOwnProfile ? (
          <Link href="/panel/perfil" passHref withAnchor={false}>
            <Button color="primary" fullWidth variant="text">
              Administrar Perfil
            </Button>
          </Link>
        ) : (
          <Link href="/panel" passHref withAnchor={false}>
            <Button color="primary" fullWidth variant="text">
              Panel Principal
            </Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
};
