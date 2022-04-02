import { Link as MUILink, Typography } from "@mui/material";
import React, { FC } from "react";
import { Link } from "..";
import { UIBreadcrumbs } from "./UIBreadcrumbs";

export const Breadcrumb: FC<UIBreadcrumbs.BreadcrumbProps> = (props) => {
  const { href, title, icon, disabled } = props;

  if (!disabled)
    return (
      <Link href={href} passHref withAnchor={false}>
        <MUILink
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
        >
          {icon}
          {title}
        </MUILink>
      </Link>
    );

  return (
    <Typography
      sx={{ display: "flex", alignItems: "center" }}
      color="text.primary"
    >
      {icon}
      {title}
    </Typography>
  );
};

Breadcrumb.defaultProps = {
  disabled: false,
  icon: null,
};
