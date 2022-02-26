import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthService } from "../lib/services/AuthService";
import { toast } from "react-toastify";
import { useRequest } from "@lib";

const Logout = () => {
  const router = useRouter();
  const { doRequest } = useRequest({
    request: AuthService.logout,
    onSuccess: (data) => router.push("/ingresar"),
    onError: (err) => {
      for (const error of err.errors) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    doRequest();
  }, [doRequest]);

  return <div>Saliendo...</div>;
};

export default Logout;
