import { Permissions, usePermissionsContext } from "@lib";
import { Permission } from "@types";
import React, { FC, Fragment } from "react";
import { Auth } from "./Auth";

export const WithPermissions: FC<Auth.WithPermissionsProps> = (props) => {
  const { children, permission } = props;
  const { permissions } = usePermissionsContext();

  if (hasPermission(permissions, permission))
    return <Fragment>{children}</Fragment>;

  return null;
};

const hasPermission = (
  userPermissions: Permission[],
  permission: Permissions
) => {
  return userPermissions.some(
    (userPermission) => userPermission.name === permission
  );
};
