"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";

import { auth } from "@/lib/firebase/client";

const provider = new GoogleAuthProvider();
const fbprovider = new FacebookAuthProvider();

interface IAuthContext {
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  sessionBasedSignin: (email: string, password: string) => Promise<void>;
  signInWithGoogleAccount: () => Promise<void>;
  signInWithFacebookAccount: () => Promise<void>;
  error: any;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  signIn: async (email: string, password: string) => {},
  logout: async () => {},
  sessionBasedSignin: async (email: string, password: string) => {},
  signInWithGoogleAccount: async () => {},
  signInWithFacebookAccount: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setInitialLoading(false);
      }),
    [auth]
  );

  const signInWithGoogleAccount = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithPopup(auth, provider);
      router.push(`/onboarding/?id=${auth.currentUser?.uid}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebookAccount = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithPopup(auth, fbprovider);
      setUser(user);
      router.push(`/onboarding/?id=${auth.currentUser?.uid}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError("");
      setLoading(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredentials.user);
      router.push(`/onboarding/?id=${auth.currentUser?.uid}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sessionBasedSignin = async (email: string, password: string) => {
    try {
      setError("");
      setLoading(true);
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      router.push(`/onboarding/?id=${auth.currentUser?.uid}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/auth/login");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const memoedValue = useMemo<IAuthContext>(
    () => ({
      user,
      signIn,
      sessionBasedSignin,
      signInWithGoogleAccount,
      signInWithFacebookAccount,
      logout,
      loading,
      error,
    }),
    [
      user,
      signIn,
      sessionBasedSignin,
      signInWithGoogleAccount,
      signInWithFacebookAccount,
      logout,
      loading,
      error,
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
