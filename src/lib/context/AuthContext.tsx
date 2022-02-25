import { createContext, FC, useContext, useMemo } from "react";
import { CurrentUser } from "@types";

interface AuthContextInterface {
  currentUser: CurrentUser["currentUser"];
}

export const AuthContext = createContext<AuthContextInterface>({
  currentUser: null,
});

export const AuthContextProvider: FC<AuthContextInterface> = (props) => {
  const { currentUser, children } = props;

  const value = useMemo(() => ({ currentUser }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
