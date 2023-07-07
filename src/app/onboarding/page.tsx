"use client";

import { useEffect } from "react";
import { Metadata } from "next";
import { useSearchParams, redirect } from "next/navigation";

import { db, auth } from "@/lib/firebase/client";
import { doc, getDoc } from "@firebase/firestore";

import OnBoardingForm from "@/modules/OnBoarding";

export const metadata: Metadata = {
  title: "OnBoarding",
  description:
    "This page provides information and guidance for new users to get started with our platform.",
};

const OnBoarding = () => {
  const search = useSearchParams();

  const uid = search.get("id");

  useEffect(() => {
    (async () => {
      if (!uid || uid !== auth.currentUser?.uid) {
        redirect("/");
      }
      try {
        const docRef = await getDoc(doc(db, "users", `${uid}`));
        if (docRef.exists()) {
          if (docRef.data().role === "buyer") redirect("/");
          else redirect("/dashboard");
        }
      } catch (e: any) {
        redirect("/500");
      }
    })();
  }, []);

  return (
    <>
      <section className="relative space-y-3 md:shadow-lg lg:w-[500px] max-w-[550px] rounded-xl border-0 md:border-2 md:p-5 px-3 py-4">
        <OnBoardingForm />
      </section>
    </>
  );
};

export default OnBoarding;
