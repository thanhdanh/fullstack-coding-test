import { useEffect, useState } from "react";
import { firebaseClient } from "./firebaseClient";

function useFirebaseAuth() {
  const [user, setAuthUser] = useState<firebaseClient.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signUp = (email: string, password: string) =>
    firebaseClient.auth().createUserWithEmailAndPassword(email, password);

  const signIn = (email: string, password: string) => firebaseClient.auth().signInWithEmailAndPassword(email, password);

  const signOut = () =>
    firebaseClient
      .auth()
      .signOut()
      .then(() => {
        setAuthUser(null);
        setLoading(true);
      });

  const authStateChanged = async (authState: firebaseClient.User) => {
    if (!authState) {
      setLoading(false);
      setAuthUser(null);
      return;
    }

    setLoading(true);
    setAuthUser(authState);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = firebaseClient.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };
}

export default useFirebaseAuth;
