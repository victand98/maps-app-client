import React from "react";
import { Link, Typography } from "@mui/material";
import { AnyMxRecord } from "dns";

export const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Ciclovía App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
