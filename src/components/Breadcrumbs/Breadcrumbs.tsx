import { titleCase } from "@lib";
import { Home } from "@mui/icons-material";
import { Breadcrumbs as MUIBreadcrumbs } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { UIBreadcrumbs } from "./UIBreadcrumbs";

export const Breadcrumbs: FC<UIBreadcrumbs.BreadcrumbsProps> = (props) => {
  const {
    omitRoot,
    rootHref,
    rootTitle,
    disableRoot,
    omitIndexList,
    labelsToUppercase,
    labelsToCapitalize,
    replaceCharacterList,
    transformLabel,
    ...rest
  } = props;
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<
    Omit<UIBreadcrumbs.BreadcrumbProps, "title"> & {
      title: string;
    }
  > | null>(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          title: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) return null;

  return (
    <MUIBreadcrumbs separator="›" aria-label="breadcrumb" {...rest}>
      {!omitRoot && (
        <Breadcrumb
          href={rootHref!}
          title={convertTitle(
            rootTitle!,
            labelsToUppercase,
            labelsToCapitalize,
            replaceCharacterList,
            transformLabel
          )}
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
          disabled={disableRoot}
        />
      )}

      {breadcrumbs.length >= 1 &&
        breadcrumbs.map((breadcrumb, index) => {
          if (
            !breadcrumb ||
            breadcrumb.title.length === 0 ||
            (omitIndexList && omitIndexList.find((value) => value === index))
          ) {
            return;
          }
          return (
            <Breadcrumb
              key={breadcrumb.href}
              href={breadcrumb.href}
              title={convertTitle(
                breadcrumb.title,
                labelsToUppercase,
                labelsToCapitalize,
                replaceCharacterList,
                transformLabel
              )}
              icon={breadcrumb.icon}
              disabled={index === breadcrumbs.length - 1}
            />
          );
        })}
    </MUIBreadcrumbs>
  );
};

Breadcrumbs.defaultProps = {
  omitRoot: false,
  rootHref: "/",
  rootTitle: "Principal",
  disableRoot: false,
  labelsToCapitalize: true,
};

const convertTitle = (
  title: string,
  toUpperCase?: boolean,
  toCapitalize?: boolean,
  replaceCharacterList?: UIBreadcrumbs.CharacterMap[],
  transformLabel?: (title: string) => React.ReactNode
): ReactNode => {
  let transformedTitle = getPathFromUrl(title);

  if (transformLabel) {
    return transformLabel(transformedTitle);
  }

  if (replaceCharacterList) {
    for (let i = 0; i < replaceCharacterList.length; i++) {
      transformedTitle = transformedTitle.replaceAll(
        replaceCharacterList[i].from,
        replaceCharacterList[i].to
      );
    }
  }

  if (toCapitalize) return decodeURI(titleCase(transformedTitle));
  if (toUpperCase) return decodeURI(transformedTitle).toUpperCase();

  // decode for utf-8 characters and return ascii.
  return decodeURI(transformedTitle);
};

const getPathFromUrl = (url: string): string => url.split(/[?#]/)[0];
