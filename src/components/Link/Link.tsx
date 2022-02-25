import NextLink from "next/link";
import React, { FC } from "react";
import { ILink } from "./ILink";

export const Link: FC<ILink.ILinkProps> = ({
  href,
  children,
  withAnchor,
  ...rest
}) => {
  return (
    <NextLink href={href} {...rest}>
      {withAnchor ? <a>{children}</a> : children}
    </NextLink>
  );
};

Link.defaultProps = {
  withAnchor: true,
};
