import { hasAccess } from "@lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC, Fragment, useEffect } from "react";
import { LoadingScreen } from "..";
import { Auth } from "./Auth";

export const Authorization: FC<Auth.AuthorizationProps> = (props) => {
  const { roles, children } = props;
  const router = useRouter();
  const session = useSession();
  const { data, status } = session;

  useEffect(() => {
    if (status !== "loading") {
      if (!data) {
        router.push("/ingresar", {
          query: {
            returnUrl: router.pathname,
          },
        });
      } else if (!hasAccess(roles, data.user?.role.name)) {
        router.push("/no-autorizado");
      }
    }
  }, [data, roles, router, status]);

  if (status === "loading" || !hasAccess(roles, data?.user?.role.name))
    return <LoadingScreen />;

  return <Fragment>{children}</Fragment>;
};
