"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { backendUrl } from "@/json-data/backendServer";
import slugify from "slugify";
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TrendingStrategies = (props) => {
  const [strategies, setStrategies] = useState(props.data || []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(props.pages || 1);
  const router = useRouter();
  const { toast } = useToast();

  const fetchTrending = async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${backendUrl}api/strategy_categories/trending-last-24-hours?page=${currentPage}&limit=20`
      );
      const { data, pages } = res.data;
      setStrategies(data || []);
      setTotalPages(pages || 1);
      setPage(currentPage);
    } catch (error) {
      console.error("Failed to fetch trending strategies", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchTrending(1);
  // }, []);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied to clipboard",
      description: "Strategy link has been copied successfully.",
    });
  };

  const handleNextPage = () => {
    if (page < totalPages) fetchTrending(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) fetchTrending(page - 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 max-w-6xl w-full">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse h-24 rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    );
  }


  // const tags = [
  //   {
  //     "value": "long",
  //     "label": "Bullish Scan"
  //   },
  //   {
  //     "value": "short",
  //     "label": "Bearish Scan"
  //   },
  //   {
  //     "value": "intraday_long",
  //     "label": "Intraday Bullish Scan"
  //   },
  //   {
  //     "value": "intraday_short",
  //     "label": "Intraday Bearish Scan"
  //   },
  //   {
  //     "value": "Other",
  //     "label": "Other"
  //   },
  // ]

  const tagOptions = [
    { value: "long", label: "Bullish Scan" },
    { value: "short", label: "Bearish Scan" },
    { value: "intraday_long", label: "Intraday Bullish Scan" },
    { value: "intraday_short", label: "Intraday Bearish Scan" },
    { value: "Other", label: "Other" },
  ];


  if (strategies.length === 0) {
    return (
      <div className="flex justify-center px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 max-w-6xl w-full">
          {[...Array(6)].map((_, i) => (
            <div key={i} className=" h-24 rounded-xl " />
          ))}
        </div>
      </div>
    );
  }



  return (
    <div className="flex flex-col items-center px-4 ">
      <div className="p-6 max-w-6xl w-full">
        <h2 className="text-xl font-bold mb-4 text-center">🔥 Top Trending Strategies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {strategies.map((strategy, idx) => {
            const slug = slugify(strategy.link, { lower: true });
            const strategyUrl = `/strategy-builder/${slug}`;
            const fullUrl = `${window.location.origin}${strategyUrl}`;

            return (
              <div
                key={idx}
                className="relative group"
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/uri-list", fullUrl)
                }
              >
                <Card
                  onClick={() => router.push(strategyUrl)}
                  className="p-4 cursor-pointer hover:shadow-lg transition rounded-xl border border-border"
                >
                  <h3 className="text-lg font-semibold text-primary">
                    {strategy.title || strategy.link}
                  </h3>

                  {strategy.tags?.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-200 dark:text-blue-900 px-2 py-0.5 rounded">
                        {
                          tagOptions.find((t) => t.value === strategy.tags)?.label ??
                          strategy.tags
                        }
                      </span>
                    </div>
                  )}



                  {strategy.description && (
                    <p className="text-sm mt-2 text-muted-foreground">
                      {strategy.description}
                    </p>
                  )}

                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={14} />
                      {strategy.likes || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsDown size={14} />
                      {strategy.dislikes || 0}
                    </div>
                  </div>
                </Card>

                <Button
                  onClick={() => handleCopy(fullUrl)}
                  variant="ghost"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition text-xs px-2 py-1"
                >
                  <Copy size={14} className="mr-1" />
                  Copy Link
                </Button>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center gap-4">
          <Button
            onClick={handlePrevPage}
            disabled={page === 1}
            variant="outline"
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={page === totalPages}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrendingStrategies;
