import { usePermissions } from "@lib/api";
import { Permission } from "@types";
import { createContext, FC, useContext, useMemo } from "react";

interface PermissionsContextInterface {
  permissions: Permission[];
}

export const PermissionsContext = createContext<PermissionsContextInterface>({
  permissions: [],
});

export const PermissionsContextProvider: FC = (props) => {
  const { data: permissions } = usePermissions();

  const value = useMemo(
    () => ({ permissions: permissions ?? [] }),
    [permissions]
  );

  return (
    <PermissionsContext.Provider value={value}>
      {props.children}
    </PermissionsContext.Provider>
  );
};

export const usePermissionsContext = () => useContext(PermissionsContext);
