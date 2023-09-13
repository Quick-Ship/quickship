import { auth } from "@/utils";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export type AuthContextType = {
  user: any;
  loginEmailAndPassword: (email: string, password: string) => void;
  signOut: () => void;
  loading: any;
  error: any;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<any>();
  const [loading] = useAuthState(auth);
  const [error, setError] = useState<any>();

  const loginEmailAndPassword = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      return result;
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  if (typeof window !== "undefined") {
    window.localStorage.setItem("user", JSON.stringify(user));
  }

  const signOut = () => auth.signOut();

  return (
    <AuthContext.Provider
      value={{ user, loginEmailAndPassword, signOut, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
