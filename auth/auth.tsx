import { createContext, useContext } from "react";
import { firebaseClient } from "./firebaseClient";
import useFirebaseAuth from "./useFirbaseAuth";

type AuthUserCredentials = firebaseClient.auth.UserCredential;

interface IAuthContext {
  user: firebaseClient.User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthUserCredentials>;
  signUp: (email: string, password: string) => Promise<AuthUserCredentials>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: true,
  signIn: null,
  signUp: null,
  signOut: null,
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
