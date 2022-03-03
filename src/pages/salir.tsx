import { AuthService } from "@lib";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  const logout = useCallback(async () => {
    await AuthService.logout();
    const data = await signOut<any>({
      callbackUrl: "/ingresar",
      redirect: false,
    });
    if (data?.url) router.push(data.url);
  }, [router]);

  useEffect(() => {
    logout();
  }, [logout]);

  return <div>Saliendo...</div>;
};

export default Logout;
