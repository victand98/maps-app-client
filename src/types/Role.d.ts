import { Roles } from "@lib";

declare namespace RoleModel {
  export interface RoleResponse {
    name: Roles;
    __v: number;
    createdAt: string;
    status: boolean;
    updatedAt: string;
    id: string;
  }
}

export { RoleModel };
