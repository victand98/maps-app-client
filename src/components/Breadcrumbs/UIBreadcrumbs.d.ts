import { BreadcrumbsProps as MUIBreadcrumbsProps } from "@mui/material";
import { ReactNode } from "react";

declare namespace UIBreadcrumbs {
  export interface BreadcrumbsProps extends MUIBreadcrumbsProps {
    omitRoot?: boolean;
    rootHref?: string;
    rootTitle?: string;
    disableRoot?: boolean;
    omitIndexList?: number[];
    labelsToUppercase?: boolean;
    labelsToCapitalize?: boolean;
    replaceCharacterList?: CharacterMap[];
    transformLabel?: (title: string) => React.ReactNode;
  }

  export interface BreadcrumbProps {
    title: ReactNode;
    href: string;
    disabled?: boolean;
    icon?: ReactNode;
  }

  export interface CharacterMap {
    from: string;
    to: string;
  }
}

export { UIBreadcrumbs };
