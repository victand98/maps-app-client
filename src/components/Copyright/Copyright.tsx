import React from "react";
import { Typography } from "@mui/material";
import { Link } from "..";

export const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link href="/">Ciclovía App</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
