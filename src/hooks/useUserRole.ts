"use client";

import { useState, useEffect } from "react";

import { auth } from "@/lib/firebase/client";

export const useRole = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    let isCanceled = false;
    async function fetchRole() {
      const idTokenResult = await auth.currentUser?.getIdTokenResult();
      if (!isCanceled && !!idTokenResult?.claims.role) {
        setRole(idTokenResult?.claims.role);
      }
    }
    fetchRole();
    return () => {
      isCanceled = true;
    };
  }, []);
  return role;
};
