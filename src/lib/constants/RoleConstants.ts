export enum Roles {
  admin = "Administrador",
  cyclist = "Ciclista",
}

export enum Permissions {
  "read:users" = "read:users",
  "save:user" = "save:user",
  "update:user" = "update:user",

  "save:bikeway" = "save:bikeway",
  "update:bikeway" = "update:bikeway",

  "save:parkingPoint" = "save:parkingPoint",
  "update:parkingPoint" = "update:parkingPoint",

  "save:place" = "save:place",
  "update:place" = "update:place",
  "delete:place" = "delete:place",

  "save:placeType" = "save:placeType",
  "update:placeType" = "update:placeType",
}
