import { LinkProps } from "next/link";

declare namespace ILink {
  export interface ILinkProps extends LinkProps {
    withAnchor?: boolean = true;
  }
}

export { ILink };
