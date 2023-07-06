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
          redirect("/");
        }
      } catch (e: any) {
        redirect("/500");
      }
    })();
  }, []);

  return (
    <>
      <section className="w-full min-h-screen py-10 md:py-5 px-3 md:px-0 flex justify-center items-center">
        <div className="relative space-y-3 md:shadow-lg lg:w-[500px] max-w-[500px] rounded-xl border-0 md:border-2 md:p-5 px-3 py-4">
          <OnBoardingForm />
        </div>
      </section>
    </>
  );
};

export default OnBoarding;
