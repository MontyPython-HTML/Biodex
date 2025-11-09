"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged, auth } from "@/src/Firebase/auth";
import { getUserByUid } from "@/src/Firebase/database";
import { User } from "@/src/Models/User";

interface AuthContextType {
  firebaseUser: FirebaseUser | null
  userData: User | null
  loading: boolean
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider ({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUserData = async () => {
    if (firebaseUser) {
      const data = await getUserByUid(firebaseUser.uid);
      if (data) {
        const { ...userData } = data;
        setUserData(userData);
      } else {
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        const data = await getUserByUid(user.uid);
        if (data) {
          const { ...userData } = data;
          setUserData(userData);
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, userData, loading, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
