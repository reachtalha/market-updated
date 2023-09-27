'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser, deleteUser } from '@/actions/userCookies';

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
  browserSessionPersistence,
  setPersistence,
  reauthenticateWithCredential,
  updatePassword as firebaseUpdatePassword,
  EmailAuthProvider,
  updateEmail,
  updateProfile
} from 'firebase/auth';

import { auth } from '@/lib/firebase/client';
import toast from 'react-hot-toast';
import useLocale from '@/hooks/useLocale';

const provider = new GoogleAuthProvider();
const fbprovider = new FacebookAuthProvider();

interface IAuthContext {
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  sessionBasedSignin: (email: string, password: string) => Promise<void>;
  signInWithGoogleAccount: () => Promise<void>;
  signInWithFacebookAccount: () => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateCurrentUser: (displayName: string, email: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  signIn: async (email: string, password: string) => {},
  logout: async () => {},
  sessionBasedSignin: async (email: string, password: string) => {},
  signInWithGoogleAccount: async () => {},
  signInWithFacebookAccount: async () => {},
  updatePassword: async () => {},
  updateCurrentUser: async () => {},
  loading: false
});

export const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const router = useRouter();
  const locale = useLocale();
  console.log(locale)

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user: any) => {
        if (user) {
          const idTokenResult = await auth.currentUser?.getIdTokenResult();
          createUser({ uid: user.uid, role: idTokenResult?.claims?.role });
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
      setLoading(true);
      await signInWithPopup(auth, provider);
      router.push(`/${locale}/onboarding/?id=${auth.currentUser?.uid}`);
    } catch (e: any) {
      if (e.code === 'auth/user-not-found') {
        toast.error('Sorry, your account is not registered. Please check your email');
      } else if (e.code === 'auth/wrong-password') {
        toast.error('Oops! The password you entered is incorrect. Please try again.');
      } else {
        toast.error(
          "Oops! Something went wrong, and we couldn't sign you in. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebookAccount = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, fbprovider);
      setUser(user);
      router.push(`/${locale}/onboarding/?id=${auth.currentUser?.uid}`);
    } catch (e: any) {
      if (e.code === 'auth/user-not-found') {
        toast.error('Sorry, your account is not registered. Please check your email');
      } else if (e.code === 'auth/wrong-password') {
        toast.error('Oops! The password you entered is incorrect. Please try again.');
      } else {
        toast.error(
          "Oops! Something went wrong, and we couldn't sign you in. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredentials = (await signInWithEmailAndPassword(auth, email, password)) as any;
      setUser(userCredentials.user);
      if (userCredentials?.role === 'superadmin') router.push(`/${locale}/superadmin`);
      else router.push(`/${locale}/onboarding/?id=${auth.currentUser?.uid}`);
    } catch (e: any) {
      if (e.code === 'auth/user-not-found') {
        toast.error('Sorry, your account is not registered. Please check your email');
      } else if (e.code === 'auth/wrong-password') {
        toast.error('Oops! The password you entered is incorrect. Please try again.');
      } else {
        toast.error(
          "Oops! Something went wrong, and we couldn't sign you in. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const sessionBasedSignin = async (email: string, password: string) => {
    try {
      setLoading(true);
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      router.push(`/${locale}/onboarding/?id=${auth.currentUser?.uid}`);
    } catch (e: any) {
      if (e.code === 'auth/user-not-found') {
        toast.error('Sorry, your account is not registered. Please check your email');
      } else if (e.code === 'auth/wrong-password') {
        toast.error('Oops! The password you entered is incorrect. Please try again.');
      } else {
        toast.error(
          "Oops! Something went wrong, and we couldn't sign you in. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      deleteUser();
      setUser(null);
      router.push(`/${locale}/auth/login`);
    } catch (e: any) {
      toast.error(`Oops! We encountered an issue while logout.`);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    const user = auth.currentUser;
    if (user) {
      const credentials = EmailAuthProvider.credential(user.email as string, currentPassword);
      try {
        setLoading(true);
        await reauthenticateWithCredential(user, credentials);
        firebaseUpdatePassword(user, newPassword);
      } catch (err: any) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateCurrentUser = async (displayName: string, email: string) => {
    const user = auth.currentUser;
    if (user) {
      try {
        setLoading(true);
        await updateEmail(user, email);
        await updateProfile(user, {
          displayName: displayName
        });
      } catch (err: any) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
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
      updatePassword,
      updateCurrentUser,
      loading
    }),
    [
      user,
      signIn,
      sessionBasedSignin,
      signInWithGoogleAccount,
      signInWithFacebookAccount,
      logout,
      updatePassword,
      updateCurrentUser,
      loading
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{!initialLoading && children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
