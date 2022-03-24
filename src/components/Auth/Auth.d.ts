import { Roles } from "@lib";

declare namespace Auth {
  export interface AuthorizationProps {
    roles: Roles[];
  }
}

export { Auth };
