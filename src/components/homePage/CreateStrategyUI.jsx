"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CreateStrategyUI = () => {
  const router = useRouter();

  return (
    <Card className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-900 text-center transition hover:shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Start Building Your Next Big Idea
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        Craft strategies, test ideas, and explore market possibilities. Launch your next strategy today.
      </p>
      <Button
        onClick={() => router.push("/create-2")}
        className="px-6 py-2 text-lg rounded-xl transition-all"
      >
        🚀 Create Strategy
      </Button>
    </Card>
  );
};

export default CreateStrategyUI;
