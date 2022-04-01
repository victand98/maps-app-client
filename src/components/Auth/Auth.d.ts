import { Permissions, Roles } from "@lib";

declare namespace Auth {
  export interface AuthorizationProps {
    roles: Roles[];
  }

  export interface WithPermissionsProps {
    permission: Permissions;
  }
}

export { Auth };
