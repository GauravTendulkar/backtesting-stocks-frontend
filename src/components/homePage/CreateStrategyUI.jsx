"use client";
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import { createTokenSecureBackendAccess } from "@/app/actions";
import { getTokenForSessionData } from "@/utils/security";

const CreateStrategyUI = () => {
  const router = useRouter();




  useEffect(() => {
    // const getToken = async () => {
    //   try {
    //     const res = await fetch("/api/token")
    //     const data = await res.json()
    //     console.log("JWT Token from server:", data.token)
    //   } catch (err) {
    //     console.error("Error fetching token:", err)
    //   }
    // }

    // getToken()
    // getTokenForSessionData()

  }, [])


  // useEffect(() => {

  //   const getTocken = async () => {
  //     let data = {
  //       email: "user@gmail.com",
  //       "noob_message": "LoL"
  //     }
  //     data = await createTokenSecureBackendAccess(data)
  //     console.log("api tocken ******************************************************", data)
  //   }
  //   getTocken()
  // }, [])

  return (
    <Card className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-900 text-center transition hover:shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Start Building Your Next Big Idea
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        Craft strategies, test ideas, and explore market possibilities. Launch your next strategy today.
      </p>
      <Button
        onClick={() => router.push("/strategy-builder")}
        className="px-6 py-2 text-lg rounded-xl transition-all"
      >
        🚀 Create Strategy
      </Button>
    </Card>
  );
};

export default CreateStrategyUI;
