export enum Roles {
  admin = "Administrador",
  cyclist = "Ciclista",
}

export enum Permissions {
  "update:password" = "update:password",

  "read:users" = "read:users",
  "read:user" = "read:user",
  "save:user" = "save:user",
  "update:user" = "update:user",

  "read:roles" = "read:roles",
  "read:role" = "read:role",
  "save:role" = "save:role",
  "update:role" = "update:role",

  "save:bikeway" = "save:bikeway",
  "update:bikeway" = "update:bikeway",

  "save:parkingPoint" = "save:parkingPoint",
  "update:parkingPoint" = "update:parkingPoint",

  "save:parkingPointStand" = "save:parkingPointStand",
  "update:parkingPointStand" = "update:parkingPointStand",

  "save:standHistory" = "save:standHistory",
  "update:standHistory" = "update:standHistory",

  "save:place" = "save:place",
  "update:place" = "update:place",
  "delete:place" = "delete:place",

  "save:placeType" = "save:placeType",
  "update:placeType" = "update:placeType",

  "read:routes" = "read:routes",
  "read:myRoutes" = "read:myRoutes",
  "download:routes" = "download:routes",
  "read:currentRoute" = "read:currentRoute",
  "read:route" = "read:route",
  "save:route" = "save:route",
  "update:route" = "update:route",
}
